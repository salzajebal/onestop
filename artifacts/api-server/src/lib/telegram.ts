import { logger } from "./logger";

interface Application {
  id: number;
  name: string;
  phone: string;
  memo: string | null;
  createdAt: string;
}

export async function sendTelegramNotification(
  botToken: string,
  chatId: string,
  application: Application
): Promise<void> {
  if (!botToken || !chatId) {
    logger.info("Telegram not configured, skipping notification");
    return;
  }

  const message = `🔔 새 대출 상담 신청\n\n이름: ${application.name}\n연락처: ${application.phone}${application.memo ? `\n메모: ${application.memo}` : ""}\n신청 시각: ${new Date(application.createdAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.warn({ status: response.status, body: errorText }, "Telegram notification failed");
    } else {
      logger.info({ chatId }, "Telegram notification sent");
    }
  } catch (err) {
    logger.warn({ err }, "Error sending Telegram notification");
  }
}
