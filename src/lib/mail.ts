import nodemailer from 'nodemailer';

const ROUTE_TO_ADDRESS: Record<string, string> = {
  general: 'contact@intelligentsingularityinc.com',
  press: 'press@intelligentsingularityinc.com',
  partnerships: 'partnerships@intelligentsingularityinc.com',
  legal: 'legal@intelligentsingularityinc.com',
};

export type ContactRoute = keyof typeof ROUTE_TO_ADDRESS;

export type SendContactInput = {
  route: string;
  from: string;
  name: string;
  subject: string;
  body: string;
};

export type SendContactResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

function makeTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendContactMessage(
  input: SendContactInput
): Promise<SendContactResult> {
  if (!input.body.trim()) return { ok: false, error: 'Body is required.' };
  if (!input.from.includes('@')) return { ok: false, error: 'Invalid email.' };

  const to = ROUTE_TO_ADDRESS[input.route] ?? ROUTE_TO_ADDRESS.general;

  try {
    const transport = makeTransport();
    const result = await transport.sendMail({
      from: process.env.SMTP_FROM ?? 'noreply@intelligentsingularityinc.com',
      to,
      replyTo: `${input.name} <${input.from}>`,
      subject: `[${input.route}] ${input.subject}`,
      text: input.body,
    });
    return { ok: true, messageId: result.messageId };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
