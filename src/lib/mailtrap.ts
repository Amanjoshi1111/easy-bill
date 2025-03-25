import { MailtrapClient } from "mailtrap";

export const smtpClient = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN! });