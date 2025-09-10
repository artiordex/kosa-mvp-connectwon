export interface Clock {
  now(): Date;
  todayISO(): string;
}
