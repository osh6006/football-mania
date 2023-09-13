import styled from "styled-components";
import { Scheduler } from "@aldabil/react-scheduler";

import { Button } from "@mui/material";
import { EVENTS } from "../util/event";

import { EventActions, ProcessedEvent, ViewEvent } from "@aldabil/react-scheduler/types";

import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import { getLeagueSchedule } from "../api/footballApi";
import useLeagueId from "../hooks/useLeagueId";
import { formatDateToISO } from "../util/date";
import { Match } from "../type/fixtures";
import { ScheduleEvent } from "../type/schedule";
import { formatSchedule } from "../util/schedule";
import { useCallback } from "react";

const ScheduleWrapper = styled.section`
  padding: 1rem;
`;

const SchedulerTable = styled.div`
  height: 100%;
  width: 100%;
  color: black;
`;

export default function Schedule() {
  const leagueId = useLeagueId();

  // const fetchRemote = useCallback(
  //   async (query: ViewEvent): Promise<ProcessedEvent[]> => {
  //     const season = new Date(query.start).getFullYear();
  //     const start = formatDateToISO(query.start);
  //     const end = formatDateToISO(query.end);

  //     const schedules: Match[] = await getLeagueSchedule(leagueId, season, start, end);

  //     return new Promise((res) => {
  //       const formatSchedules: ScheduleEvent[] = schedules.map((schedule, i) => {
  //         return formatSchedule(schedule, i);
  //       });
  //       res(formatSchedules);
  //     });
  //   },

  //   [leagueId]
  // );

  return (
    <ScheduleWrapper>
      <Title title="경기 일정" />
      <SubTitle subtitle="리그별 모든 경기 일정을 확인해 보세요." />
      <br />
      <SchedulerTable>
        <Scheduler
          // getRemoteEvents={fetchRemote}
          timeZone="Asia/Seoul"
          view="month"
          editable={false}
          deletable={false}
          draggable={false}
          stickyNavitation
          translations={{
            navigation: {
              month: "월별",
              week: "주별",
              day: "일별",
              today: "오늘",
            },
            form: {
              addTitle: "일정 추가하기",
              editTitle: "일정 편집하기",
              confirm: "확인",
              delete: "삭제",
              cancel: "취소",
            },
            event: {
              title: "제목",
              start: "시작 일",
              end: "종료 일",
              allDay: "하루 종일",
            },
            validation: {
              required: "이 필드는 반드시 필요합니다./",
              invalidEmail: "유효하지 않은 이메일",
              onlyNumbers: "오직 숫자만 가능 합니다.",
              min: "최소 {{min}} 글자를 써야 합니다.",
              max: "최대 {{max}} 글자만 가능 합니다.",
            },
            moreEvents: "더 보기...",
            loading: "로딩중...",
          }}
          month={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 0,
            endHour: 24,
            cellRenderer: () => {
              return <Button disableRipple={true} disabled={true}></Button>;
            },
          }}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 6,
            startHour: 0,
            endHour: 24,
            step: 30,
            cellRenderer: () => {
              return <Button disableRipple={true} disabled={true}></Button>;
            },
          }}
          day={{
            startHour: 0,
            endHour: 24,
            step: 60,
            cellRenderer: () => {
              return <Button disableRipple={true} disabled={true}></Button>;
            },
          }}
        />
      </SchedulerTable>
    </ScheduleWrapper>
  );
}
