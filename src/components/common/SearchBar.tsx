import { useState } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";

interface SearchBarProps {
  searchValue: string;
  onSearchValueChange: (newValue: string) => void;
}

const SearchForm = styled.div`
  width: 40%;
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  top: 0;
  left: 50%;
  padding: 12px 0;
  margin-top: 1rem;
  border-radius: 92px;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.colors.activeBackground};
  max-width: 500px;
  min-width: 300px;
  z-index: 10;

  outline: 2px solid ${(props) => props.theme.colors.primary};

  &:focus {
    outline: 2px solid red;
  }

  @media (max-width: 768px) {
    left: 40%;
  }

  @media (max-width: 1280px) {
    transform: translateX(-40%);
    width: 50%;
  }
`;

const SearchInput = styled.input`
  font-size: 1rem;
  line-height: 21px;
  letter-spacing: 0.03px;
  border: none;
  background-color: transparent;
  padding: 0;
  margin-left: 2rem;
  outline: none;
  flex: 1;
  color: ${(props) => props.theme.colors.white};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SearchSpan = styled.span`
  content: "";
  width: 1px;
  height: 28px;
  margin: -3px 0;
  background-color: ${(props) => props.theme.colors.white};
`;

const SearchBtn = styled.button`
  padding: 10px 16px;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  outline: none;
  border: none;
  border-top-right-radius: 92px;
  border-bottom-right-radius: 92px;
  background-color: transparent;
  transition: background 0.1s ease-in;

  &:hover {
    font-weight: bold;
    background-color: ${(props) => props.theme.colors.secondBackground};
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearchValueChange, searchValue }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onSearchValueChange(newValue);
  };

  return (
    <SearchForm className={isInputFocused ? "focused" : ""}>
      <SearchInput
        placeholder="팀이나 선수를 검색해 보세요 (영어로)"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={searchValue}
        onChange={handleInputChange}
      />
      <SearchSpan />
      <SearchBtn type="submit">
        <AiOutlineSearch size="25" />
      </SearchBtn>
    </SearchForm>
  );
};

export default SearchBar;
