/**
 * Description : email.ts - 📌 SMTP(NodeMailer) 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import nodemailer from 'nodemailer';

import type {
  EmailAddress,
  EmailConfig,
  EmailResult,
  SendEmailRequest,
  SendVerificationCodeParams,
} from '../../../core-types.js';

// 이메일 주소를 "Name <email>" 형식으로 변환
function toAddressString(a: EmailAddress): string {
  return a.name ? `"${a.name}" <${a.email}>` : a.email;
}

// SMTP 이메일 어댑터
export class EmailAdapter {
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: EmailConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  // SMTP 서버 연결 테스트
  async verify(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch {
      return false;
    }
  }

  // 이메일 전송
  async sendEmail(req: SendEmailRequest): Promise<EmailResult> {
    try {
      const from = toAddressString(this.config.from);
      const to = req.to.map(toAddressString).join(', ');
      const cc = req.cc?.map(toAddressString).join(', ');
      const bcc = req.bcc?.map(toAddressString).join(', ');
      const mailOptions: nodemailer.SendMailOptions = {
        from,
        to,
        subject: req.subject,
        ...(cc ? { cc } : {}),
        ...(bcc ? { bcc } : {}),
        ...(req.html ? { html: req.html } : {}),
        ...(req.text ? { text: req.text } : {}),
        ...(req.attachments
          ? {
              attachments: req.attachments.map(a => ({
                filename: a.filename,
                content: a.content as any,
                contentType: a.content_type,
                ...(a.disposition ? { contentDisposition: a.disposition } : {}),
                ...(a.content_id ? { cid: a.content_id } : {}),
              })),
            }
          : {}),
        // 우선순위 → 메일 헤더 힌트
        ...(req.priority
          ? {
              headers: {
                'X-Priority':
                  req.priority === 'high' || req.priority === 'urgent'
                    ? '1 (Highest)'
                    : req.priority === 'low'
                      ? '5 (Lowest)'
                      : '3 (Normal)',
              },
            }
          : {}),
      };

      const info = await this.transporter.sendMail(mailOptions);
      return { success: true, message_id: info.messageId };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'SMTP send error',
      };
    }
  }

  // 인증 코드 이메일 전송
  async sendVerificationCode(p: SendVerificationCodeParams): Promise<EmailResult> {
    const expiry = p.expires_in_minutes ?? 10;

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
        <h2>ConnectWon 인증번호</h2>
        <p>요청하신 인증번호입니다:</p>
        <div style="font-size:32px;font-weight:700;color:#1D4ED8;padding:12px 16px;background:#F1F5F9;border-radius:8px;display:inline-block;">
          ${p.code}
        </div>
        <p style="margin-top:8px;">이 코드는 <b>${expiry}분</b> 동안 유효합니다.</p>
        <p style="color:#dc2626;">이 코드를 타인과 공유하지 마세요.</p>
      </div>
    `.trim();

    const text = `ConnectWon 인증번호: ${p.code}\n유효기간: ${expiry}분`;

    return this.sendEmail({
      to: [{ email: p.email }],
      subject: '[ConnectWon] 인증번호',
      html,
      text,
    });
  }
}
