/**
 * Description : queue/scheduler.ts - 📌 작업 스케줄러
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type { QueueManager } from './manager.js';
import type { CleanupJobData, ReportJobData, SessionReminderJobData } from './types.js';

// ============== 스케줄러 ==============

export class JobScheduler {
  private intervals = new Map<string, NodeJS.Timeout>();
  private isRunning = false;

  constructor(private queueManager: QueueManager) {}

  // 스케줄러 시작
  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.setupSchedules();
  }

  // 스케줄러 중지
  stop(): void {
    this.isRunning = false;

    for (const interval of this.intervals.values()) {
      clearInterval(interval);
    }
    this.intervals.clear();
  }

  // 정기 작업 설정
  private setupSchedules(): void {
    // 매분마다 세션 리마인더 체크
    this.scheduleInterval(
      'session-reminders',
      () => {
        this.scheduleSessionReminders();
      },
      60 * 1000,
    ); // 1분

    // 매시간마다 정리 작업
    this.scheduleInterval(
      'cleanup',
      () => {
        this.scheduleCleanupJobs();
      },
      60 * 60 * 1000,
    ); // 1시간

    // 매일 오전 9시에 일일 보고서
    this.scheduleDailyAt('daily-report', '09:00', () => {
      this.scheduleDailyReport();
    });

    // 매주 월요일 오전 9시에 주간 보고서
    this.scheduleWeeklyAt('weekly-report', 1, '09:00', () => {
      this.scheduleWeeklyReport();
    });

    // 매월 1일 오전 9시에 월간 보고서
    this.scheduleMonthlyAt('monthly-report', 1, '09:00', () => {
      this.scheduleMonthlyReport();
    });
  }

  // 세션 리마인더 스케줄링
  private async scheduleSessionReminders(): Promise<void> {
    try {
      // TODO: 실제 구현에서는 SessionRepository에서 예정된 세션 조회
      const upcomingSessions = await this.getUpcomingSessions();

      for (const session of upcomingSessions) {
        const now = new Date();
        const sessionStart = new Date(session.starts_at);
        const timeDiff = sessionStart.getTime() - now.getTime();

        // 1시간 전 리마인더
        if (timeDiff <= 60 * 60 * 1000 && timeDiff > 50 * 60 * 1000) {
          await this.queueManager.addSessionReminderJob(
            {
              session_id: session.id,
              reminder_type: 'before_1_hour',
              participants: session.participants || [],
            },
            { priority: 'normal' },
          );
        }

        // 30분 전 리마인더
        if (timeDiff <= 30 * 60 * 1000 && timeDiff > 20 * 60 * 1000) {
          await this.queueManager.addSessionReminderJob(
            {
              session_id: session.id,
              reminder_type: 'before_30_min',
              participants: session.participants || [],
            },
            { priority: 'high' },
          );
        }

        // 10분 전 리마인더
        if (timeDiff <= 10 * 60 * 1000 && timeDiff > 0) {
          await this.queueManager.addSessionReminderJob(
            {
              session_id: session.id,
              reminder_type: 'before_10_min',
              participants: session.participants || [],
            },
            { priority: 'urgent' },
          );
        }

        // 시작 알림
        if (timeDiff <= 0 && timeDiff > -5 * 60 * 1000) {
          await this.queueManager.addSessionReminderJob(
            {
              session_id: session.id,
              reminder_type: 'started',
              participants: session.participants || [],
            },
            { priority: 'urgent' },
          );
        }
      }
    } catch (error) {
      console.error('Failed to schedule session reminders:', error);
    }
  }

  // 정리 작업 스케줄링
  private async scheduleCleanupJobs(): Promise<void> {
    try {
      // 만료된 세션 정리 (7일 이상)
      await this.queueManager.addCleanupJob(
        {
          target: 'expired_sessions',
          older_than_days: 7,
        },
        { priority: 'low' },
      );

      // 오래된 알림 정리 (30일 이상)
      await this.queueManager.addCleanupJob(
        {
          target: 'old_notifications',
          older_than_days: 30,
        },
        { priority: 'low' },
      );

      // 임시 파일 정리 (1일 이상)
      await this.queueManager.addCleanupJob(
        {
          target: 'temp_files',
          older_than_days: 1,
        },
        { priority: 'low' },
      );
    } catch (error) {
      console.error('Failed to schedule cleanup jobs:', error);
    }
  }

  // 일일 보고서 스케줄링
  private async scheduleDailyReport(): Promise<void> {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const startDate = new Date(yesterday);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(yesterday);
      endDate.setHours(23, 59, 59, 999);

      await this.queueManager.addReportJob(
        {
          report_type: 'daily_summary',
          date_range: {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
          },
          recipients: await this.getReportRecipients('daily'),
          format: 'email',
        },
        { priority: 'normal' },
      );
    } catch (error) {
      console.error('Failed to schedule daily report:', error);
    }
  }

  // 주간 보고서 스케줄링
  private async scheduleWeeklyReport(): Promise<void> {
    try {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);

      const startDate = new Date(lastWeek);
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // 월요일
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // 일요일
      endDate.setHours(23, 59, 59, 999);

      await this.queueManager.addReportJob(
        {
          report_type: 'weekly_stats',
          date_range: {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
          },
          recipients: await this.getReportRecipients('weekly'),
          format: 'email',
        },
        { priority: 'normal' },
      );
    } catch (error) {
      console.error('Failed to schedule weekly report:', error);
    }
  }

  // 월간 보고서 스케줄링
  private async scheduleMonthlyReport(): Promise<void> {
    try {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      const endDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
      endDate.setHours(23, 59, 59, 999);

      await this.queueManager.addReportJob(
        {
          report_type: 'monthly_report',
          date_range: {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
          },
          recipients: await this.getReportRecipients('monthly'),
          format: 'pdf',
        },
        { priority: 'normal' },
      );
    } catch (error) {
      console.error('Failed to schedule monthly report:', error);
    }
  }

  // 유틸리티 메서드들
  private scheduleInterval(name: string, callback: () => void, interval: number): void {
    const timeout = setInterval(callback, interval);
    this.intervals.set(name, timeout);
  }

  private scheduleDailyAt(name: string, time: string, callback: () => void): void {
    const [hours, minutes] = time.split(':').map(Number);

    const scheduleNext = () => {
      const now = new Date();
      const scheduled = new Date();
      scheduled.setHours(hours, minutes, 0, 0);

      // 이미 지난 시간이면 다음 날로
      if (scheduled <= now) {
        scheduled.setDate(scheduled.getDate() + 1);
      }

      const delay = scheduled.getTime() - now.getTime();

      const timeout = setTimeout(() => {
        callback();
        scheduleNext(); // 다음 날 스케줄
      }, delay);

      this.intervals.set(name, timeout);
    };

    scheduleNext();
  }

  private scheduleWeeklyAt(
    name: string,
    dayOfWeek: number,
    time: string,
    callback: () => void,
  ): void {
    const [hours, minutes] = time.split(':').map(Number);

    const scheduleNext = () => {
      const now = new Date();
      const scheduled = new Date();

      // 다음 지정 요일 찾기
      const daysUntil = (dayOfWeek + 7 - now.getDay()) % 7 || 7;
      scheduled.setDate(now.getDate() + daysUntil);
      scheduled.setHours(hours, minutes, 0, 0);

      const delay = scheduled.getTime() - now.getTime();

      const timeout = setTimeout(() => {
        callback();
        scheduleNext(); // 다음 주 스케줄
      }, delay);

      this.intervals.set(name, timeout);
    };

    scheduleNext();
  }

  private scheduleMonthlyAt(
    name: string,
    dayOfMonth: number,
    time: string,
    callback: () => void,
  ): void {
    const [hours, minutes] = time.split(':').map(Number);

    const scheduleNext = () => {
      const now = new Date();
      const scheduled = new Date();
      scheduled.setDate(dayOfMonth);
      scheduled.setHours(hours, minutes, 0, 0);

      // 이미 지난 날짜면 다음 달로
      if (scheduled <= now) {
        scheduled.setMonth(scheduled.getMonth() + 1);
      }

      const delay = scheduled.getTime() - now.getTime();

      const timeout = setTimeout(() => {
        callback();
        scheduleNext(); // 다음 달 스케줄
      }, delay);

      this.intervals.set(name, timeout);
    };

    scheduleNext();
  }

  // Mock 데이터 조회 메서드들 (실제로는 Repository에서 조회)
  private async getUpcomingSessions(): Promise<any[]> {
    // TODO: SessionRepository.findUpcoming() 호출
    return [];
  }

  private async getReportRecipients(reportType: string): Promise<string[]> {
    // TODO: UserRepository에서 관리자 이메일 조회
    return ['admin@connectwon.com'];
  }
}
