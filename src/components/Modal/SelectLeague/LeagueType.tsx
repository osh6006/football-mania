import React from "react";
import { DBLeague } from "../../../type/dbleague";
import styled from "styled-components";

import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { isLeagueListIncludeId } from "../../../util/league";

interface LeagueTypeProps {
  league: DBLeague;
  role: "add" | "delete";
  leagueList: DBLeague[] | null;
  setLeagueList: (league: DBLeague[] | null) => void;
}

interface LeagueColorProps {
  $color: string;
}

const LeagueTypeWrapper = styled.li<LeagueColorProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background-color: ${(props) => props.$color};
  border-radius: ${(props) => props.theme.border.radius};
  min-width: 80px;
  gap: 0.5rem;
  user-select: none;
`;

const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  transition: all 0.1s linear;

  &:hover {
    scale: 1.13;
  }
`;

const LeagueType: React.FC<LeagueTypeProps> = ({
  league,
  role,
  leagueList,
  setLeagueList,
}) => {
  const handleDelete = (id: number) => {
    // dispatch(deleteLeagueTypes(id));
    if (leagueList && leagueList.length > 1) {
      const filteredLeagueList = leagueList?.filter((el) => el.id !== id);
      setLeagueList(filteredLeagueList);
    }
  };

  const handleAdd = (league: DBLeague) => {
    // dispatch(addLeagueTypes(league));
    if (leagueList && !isLeagueListIncludeId(leagueList, league)) {
      const temp = [...leagueList];
      temp.push(league);
      setLeagueList(temp);
    }
  };

  return (
    <LeagueTypeWrapper $color={league.color}>
      <p>{league.name}</p>
      {role === "delete" && (
        <DeleteBtn onClick={() => handleDelete(league.id)}>
          <AiOutlineClose size={18} />
        </DeleteBtn>
      )}

      {role === "add" && (
        <DeleteBtn onClick={() => handleAdd(league)}>
          <AiOutlinePlus size={18} />
        </DeleteBtn>
      )}
    </LeagueTypeWrapper>
  );
};

export default LeagueType;
