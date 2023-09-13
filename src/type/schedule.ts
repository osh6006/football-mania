export interface ScheduleEvent {
  event_id: number;
  admin_id: number;
  title: string;
  start: Date;
  end: Date;
  disabled?: boolean;
  editable?: boolean;
  color?: string;
}
