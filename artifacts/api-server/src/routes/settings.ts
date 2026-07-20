import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, settingsTable } from "@workspace/db";
import { UpdateSettingsBody } from "@workspace/api-zod";

const router: IRouter = Router();

const SETTING_KEYS = [
  "kakaoLink",
  "telegramBotToken",
  "telegramChatId",
  "companyName",
  "representative",
  "businessNumber",
  "registrationNumber",
  "address",
  "phone",
] as const;

const DEFAULT_SETTINGS: Record<string, string> = {
  kakaoLink: "",
  telegramBotToken: "",
  telegramChatId: "",
  companyName: "원스톱 머니",
  representative: "",
  businessNumber: "",
  registrationNumber: "",
  address: "",
  phone: "",
};

export async function getSettingValue(key: string): Promise<string> {
  const result = await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.key, key))
    .limit(1);
  return result[0]?.value ?? DEFAULT_SETTINGS[key] ?? "";
}

async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(settingsTable);
  const map: Record<string, string> = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

router.get("/settings", async (_req, res): Promise<void> => {
  const settings = await getAllSettings();
  res.json({
    kakaoLink: settings.kakaoLink ?? "",
    telegramBotToken: settings.telegramBotToken ?? "",
    telegramChatId: settings.telegramChatId ?? "",
    companyName: settings.companyName ?? "",
    representative: settings.representative ?? "",
    businessNumber: settings.businessNumber ?? "",
    registrationNumber: settings.registrationNumber ?? "",
    address: settings.address ?? "",
    phone: settings.phone ?? "",
  });
});

router.post("/telegram/detect-chat", async (req, res): Promise<void> => {
  const { botToken } = req.body as { botToken?: string };
  if (!botToken) {
    res.status(400).json({ error: "botToken is required" });
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?limit=100&allowed_updates=["message","my_chat_member","chat_member"]`
    );
    const data = await response.json() as {
      ok: boolean;
      result: Array<{
        message?: { chat: { id: number; title?: string; first_name?: string; type: string } };
        my_chat_member?: { chat: { id: number; title?: string; first_name?: string; type: string } };
      }>;
    };

    if (!data.ok) {
      res.status(400).json({ error: "Invalid bot token" });
      return;
    }

    const chatMap = new Map<string, { id: string; title: string; type: string }>();
    for (const update of data.result) {
      const chat = update.message?.chat ?? update.my_chat_member?.chat;
      if (chat) {
        const id = String(chat.id);
        const title = chat.title ?? chat.first_name ?? id;
        chatMap.set(id, { id, title, type: chat.type });
      }
    }

    const chats = Array.from(chatMap.values());
    res.json({ chats });
  } catch {
    res.status(400).json({ error: "Failed to connect to Telegram API" });
  }
});

router.put("/settings", async (req, res): Promise<void> => {
  const parsed = UpdateSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updates = parsed.data;
  for (const key of SETTING_KEYS) {
    const value = updates[key];
    if (value !== undefined) {
      await db
        .insert(settingsTable)
        .values({ key, value })
        .onConflictDoUpdate({ target: settingsTable.key, set: { value } });
    }
  }

  const settings = await getAllSettings();
  res.json({
    kakaoLink: settings.kakaoLink ?? "",
    telegramBotToken: settings.telegramBotToken ?? "",
    telegramChatId: settings.telegramChatId ?? "",
    companyName: settings.companyName ?? "",
    representative: settings.representative ?? "",
    businessNumber: settings.businessNumber ?? "",
    registrationNumber: settings.registrationNumber ?? "",
    address: settings.address ?? "",
    phone: settings.phone ?? "",
  });
});

export default router;
