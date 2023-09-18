import React from "react";
import { DBLeague } from "../../../type/dbleague";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import {
  addLeagueTypes,
  deleteLeagueTypes,
} from "../../../features/league/leagueSlice";

import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

interface LeagueTypeProps {
  league: DBLeague;
  role: "add" | "delete";
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

const LeagueType: React.FC<LeagueTypeProps> = ({ league, role }) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteLeagueTypes(id));
  };

  const handleAdd = (id: number) => {
    dispatch(addLeagueTypes(id));
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
        <DeleteBtn onClick={() => handleAdd(league.id)}>
          <AiOutlinePlus size={18} />
        </DeleteBtn>
      )}
    </LeagueTypeWrapper>
  );
};

export default LeagueType;
