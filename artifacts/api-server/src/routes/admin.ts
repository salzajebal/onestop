import { Router, type IRouter, type Request, type Response } from "express";
import { AdminLoginBody } from "@workspace/api-zod";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "perfectron2025";

const sessions = new Set<string>();

function generateSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function isAdminAuthenticated(req: Request): boolean {
  const sessionId = req.cookies?.admin_session as string | undefined;
  return !!sessionId && sessions.has(sessionId);
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const sessionId = generateSessionId();
  sessions.add(sessionId);

  res.cookie("admin_session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  const sessionId = req.cookies?.admin_session as string | undefined;
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.clearCookie("admin_session");
  res.json({ success: true });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ authenticated: true });
});

export default router;
