import { useState } from "react";

import styled from "styled-components";
import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import SearchBar from "../components/common/SearchBar";
import SearchResult from "../components/Search/SearchResult";

const SearchWrapper = styled.section`
  padding: 1rem 1rem;
`;

const StyledHr = styled.hr`
  width: 100%;
  margin-top: 15vh;
`;

const SearchContentsWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const SearchContentHeader = styled.div``;

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchValueChange = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <SearchWrapper>
      <Title title="검색" />
      <SubTitle subtitle="리그 팀과 선수들을 검색해 보세요. " />
      <SearchContentsWrapper>
        <SearchContentHeader>
          <SearchBar
            searchValue={searchValue}
            onSearchValueChange={handleSearchValueChange}
          />
        </SearchContentHeader>
        <StyledHr />
        <SearchResult searchValue={searchValue} />
      </SearchContentsWrapper>
    </SearchWrapper>
  );
}
