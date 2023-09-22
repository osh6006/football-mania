import { styled } from "styled-components";
import { Trophie } from "../../type/trophies";

interface CareerTableProps {
  trophies?: Trophie[];
}

const CareerTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.border.radius};
`;

const Career = styled.p`
  margin: 4px 0;
  text-align: center;
`;

const CareerTable: React.FC<CareerTableProps> = ({ trophies }) => {
  return (
    <CareerTableWrapper>
      {trophies?.map((trophy) => (
        <Career key={`${trophy.season}${trophy.country}`}>
          {`${trophy.season} ${trophy.league} ${trophy.place} IN ${trophy.country}`}
        </Career>
      ))}
    </CareerTableWrapper>
  );
};

export default CareerTable;
