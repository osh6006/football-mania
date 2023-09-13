import { Match } from "../type/fixtures";
import { ScheduleEvent } from "../type/schedule";

export function formatSchedule(schedule: Match, index: number): ScheduleEvent {
  const start = new Date(schedule.fixture.date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  return {
    event_id: index + 1,
    title: `${schedule.teams.home.name} ${schedule.goals.home === null ? "" : schedule.goals.home} - ${
      schedule.goals.away === null ? "" : schedule.goals.away
    } ${schedule.teams.away.name}`,
    start,
    end,
    admin_id: index + 1,
  };
}
