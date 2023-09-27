import styled from "styled-components";
import { Events } from "../../type/fixtures";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface EventProps {
  events?: Events[];
}

const EventWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  border: 2px solid gray;
`;

const TempDiv = styled.div``;

const EventContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const EventContents = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled(LazyLoadImage)`
  max-width: 20px;
`;

const Event: React.FC<EventProps> = ({ events }) => {
  return (
    <EventWrapper>
      <TempDiv></TempDiv>
      <EventContentsWrapper>
        {events &&
          events.map((event, i) => (
            <EventContents key={i}>
              <Logo src={event.team.logo} alt="TeamLogo" effect="blur" />
              {`${event.time.elapsed}" ${
                event.comments === null ? "" : event.comments
              } ${event.detail === null ? "" : event.detail} - ${
                event.player.name
              }`}
            </EventContents>
          ))}
      </EventContentsWrapper>
      <TempDiv></TempDiv>
    </EventWrapper>
  );
};

export default Event;
