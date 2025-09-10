import { logger } from '@connectwon/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // 이메일 발송 로직 (예: nodemailer, sendgrid 등)
      logger.info('Email sent successfully', {
        to: options.to,
        subject: options.subject
      });
      return true;
    } catch (error) {
      logger.error('Failed to send email', { error, options });
      return false;
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      subject: 'Welcome to ConnectWon!',
      html: `
        <h1>Welcome ${userName}!</h1>
        <p>Thank you for joining ConnectWon. We're excited to have you!</p>
      `,
      text: `Welcome ${userName}! Thank you for joining ConnectWon.`
    });
  }

  async sendBookingConfirmation(
    userEmail: string,
    programTitle: string,
    sessionDate: Date
  ): Promise<boolean> {
    return this.sendEmail({
      to: userEmail,
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Your booking for <strong>${programTitle}</strong> has been confirmed.</p>
        <p>Date: ${sessionDate.toLocaleDateString()}</p>
        <p>Time: ${sessionDate.toLocaleTimeString()}</p>
      `
    });
  }
}

export const emailService = new EmailService();
