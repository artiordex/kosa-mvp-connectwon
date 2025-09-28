/**
 * Description : email.adapter.ts - 📧 Gmail SMTP 기반 이메일 알림 어댑터
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import type {
  EmailConfig,
  EmailRequest,
  EmailResult,
  NotificationEvent,
  NotificationResult,
  NotificationService,
  SendEmailRequest,
  SendVerificationCodeParams,
  SlackFileRequest,
  SlackFileResult,
  SlackRequest,
  SlackResult,
  TemplateEmailRequest,
  TemplateManager,
} from '../../../core/src/ports/notification.port.js';
import nodemailer from 'nodemailer';

export class EmailNotificationAdapter implements NotificationService {
  private transporter;

  constructor(
    private readonly config: EmailConfig,
    private readonly templateManager?: TemplateManager,
  ) {
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

  async sendEmail(request: EmailRequest): Promise<EmailResult> {
    const sendRequest: SendEmailRequest = {
      to: [{ email: request.to }],
      subject: request.subject,
      html: request.html ?? '',
      text: request.text ?? '',
    };
    return this.sendEmailInternal(sendRequest);
  }

  async sendTemplateEmail(request: TemplateEmailRequest): Promise<EmailResult> {
    if (!this.templateManager) {
      return { success: false, error: 'TemplateManager not configured' };
    }

    const rendered = this.templateManager.render(request.templateId, request.templateData);
    if (!rendered) {
      return { success: false, error: 'Template rendering failed' };
    }

    const sendRequest: SendEmailRequest = {
      to: [{ email: request.to }],
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    };
    return this.sendEmailInternal(sendRequest);
  }

  async sendBulkEmail(requests: EmailRequest[]): Promise<EmailResult[]> {
    return Promise.all(requests.map(req => this.sendEmail(req)));
  }

  async sendVerificationCode(email: string, code: string, purpose: 'signup' | 'email_change'): Promise<EmailResult> {
    const subject = `[${purpose === 'signup' ? '회원가입' : '이메일 변경'}] 인증번호 안내`;
    const html = `<p>인증번호는 <strong>${code}</strong> 입니다.</p>`;
    const text = `인증번호: ${code}`;
    return this.sendEmail({ to: email, subject, html, text });
  }

  async sendEmailExtended(request: SendEmailRequest): Promise<EmailResult> {
    return this.sendEmailInternal(request);
  }

  async sendVerificationCodeExtended(params: SendVerificationCodeParams): Promise<EmailResult> {
    const subject = `[${params.purpose ?? '인증'}] 인증번호 안내`;
    const html = `<p>${params.app_name ?? '서비스'} 인증번호는 <strong>${params.code}</strong> 입니다. ${params.expires_in_minutes ? `(${params.expires_in_minutes}분 후 만료)` : ''}</p>`;
    const text = `인증번호: ${params.code}`;
    const sendRequest: SendEmailRequest = {
      to: [{ email: params.email }],
      subject,
      html,
      text,
    };
    return this.sendEmailInternal(sendRequest);
  }

  async testEmailConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('SMTP 연결 실패:', error);
      return false;
    }
  }

  async sendEventNotification(_: NotificationEvent): Promise<NotificationResult[]> {
    throw new Error('sendEventNotification is not supported in EmailNotificationAdapter');
  }

  async sendSlack(_: SlackRequest): Promise<SlackResult> {
    throw new Error('Slack is not supported in EmailNotificationAdapter');
  }

  async uploadSlackFile(_: SlackFileRequest): Promise<SlackFileResult> {
    throw new Error('Slack file upload is not supported in EmailNotificationAdapter');
  }

  async testSlackConnection(): Promise<boolean> {
    return false;
  }

  private async sendEmailInternal(request: SendEmailRequest): Promise<EmailResult> {
    try {
      const mailOptions = {
        from: `${this.config.from.name ?? ''} <${this.config.from.email}>`,
        to: request.to.map(addr => `${addr.name ?? ''} <${addr.email}>`).join(', '),
        cc: request.cc?.map(addr => `${addr.name ?? ''} <${addr.email}>`).join(', '),
        bcc: request.bcc?.map(addr => `${addr.name ?? ''} <${addr.email}>`).join(', '),
        subject: request.subject,
        html: request.html ?? '',
        text: request.text ?? '',
        attachments: request.attachments?.map(att => ({
          filename: att.filename,
          content: att.content,
          contentType: att.contentType ?? att.content_type,
          disposition: att.disposition,
          cid: att.content_id,
        })),
      };

      const info = await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error: any) {
      console.error('이메일 전송 실패:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
