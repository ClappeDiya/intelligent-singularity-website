import { describe, expect, it, vi } from 'vitest';
import { sendContactMessage } from '@/lib/mail';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: () => ({
      sendMail: vi.fn(async (opts) => ({ messageId: 'test-123', envelope: opts })),
    }),
  },
}));

describe('sendContactMessage', () => {
  it('routes general messages to contact@', async () => {
    const result = await sendContactMessage({
      route: 'general',
      from: 'user@example.com',
      name: 'Test User',
      subject: 'Hello',
      body: 'Body',
    });
    expect(result.ok).toBe(true);
    expect(result.messageId).toBe('test-123');
  });

  it('rejects missing body', async () => {
    const result = await sendContactMessage({
      route: 'general',
      from: 'user@example.com',
      name: 'Test User',
      subject: 'Hello',
      body: '',
    });
    expect(result.ok).toBe(false);
  });
});
