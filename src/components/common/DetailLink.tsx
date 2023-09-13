import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import styled from "styled-components";

interface DetailLink {
  name: string;
  src: string;
}

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  transition: all 0.5s ease;

  &:hover {
    margin-right: 10px;
  }
`;
const DetailLink: React.FC<DetailLink> = ({ name, src }) => {
  return (
    <ViewAllLink to={src}>
      {name}
      <AiOutlineRight />
    </ViewAllLink>
  );
};

export default DetailLink;
