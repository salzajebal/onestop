import { Router, type IRouter } from "express";
import { desc, count, gte, sql } from "drizzle-orm";
import { db, applicationsTable } from "@workspace/db";
import {
  CreateApplicationBody,
  ListApplicationsQueryParams,
  DeleteApplicationParams,
} from "@workspace/api-zod";
import { broadcastToAll } from "../lib/websocket";
import { sendTelegramNotification } from "../lib/telegram";
import { getSettingValue } from "./settings";

const router: IRouter = Router();

router.post("/applications", async (req, res): Promise<void> => {
  const parsed = CreateApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [application] = await db
    .insert(applicationsTable)
    .values(parsed.data)
    .returning();

  const appData = {
    id: application.id,
    name: application.name,
    phone: application.phone,
    memo: application.memo ?? null,
    createdAt: application.createdAt.toISOString(),
  };

  broadcastToAll({ type: "new_application", data: appData });

  const botToken = await getSettingValue("telegramBotToken");
  const chatId = await getSettingValue("telegramChatId");
  if (botToken && chatId) {
    sendTelegramNotification(botToken, chatId, appData).catch(() => {});
  }

  res.status(201).json(appData);
});

router.get("/applications", async (req, res): Promise<void> => {
  const params = ListApplicationsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const page = params.data.page ?? 1;
  const limit = params.data.limit ?? 50;
  const offset = (page - 1) * limit;

  const [applications, totalResult] = await Promise.all([
    db
      .select()
      .from(applicationsTable)
      .orderBy(desc(applicationsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(applicationsTable),
  ]);

  res.json({
    applications: applications.map((a) => ({
      id: a.id,
      name: a.name,
      phone: a.phone,
      memo: a.memo ?? null,
      createdAt: a.createdAt.toISOString(),
    })),
    total: totalResult[0]?.count ?? 0,
    page,
    limit,
  });
});

router.get("/applications/stats", async (_req, res): Promise<void> => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(todayStart.getDate() - todayStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalResult, todayResult, weekResult, monthResult] = await Promise.all([
    db.select({ count: count() }).from(applicationsTable),
    db.select({ count: count() }).from(applicationsTable).where(gte(applicationsTable.createdAt, todayStart)),
    db.select({ count: count() }).from(applicationsTable).where(gte(applicationsTable.createdAt, weekStart)),
    db.select({ count: count() }).from(applicationsTable).where(gte(applicationsTable.createdAt, monthStart)),
  ]);

  res.json({
    total: totalResult[0]?.count ?? 0,
    today: todayResult[0]?.count ?? 0,
    thisWeek: weekResult[0]?.count ?? 0,
    thisMonth: monthResult[0]?.count ?? 0,
  });
});

router.delete("/applications/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = DeleteApplicationParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(applicationsTable)
    .where(sql`${applicationsTable.id} = ${params.data.id}`)
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
