import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled.div`
  position: relative;
  width: 100%;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;

  input {
    width: 100%;
    padding: 12px 40px 12px 20px;
    border: none;
    background: transparent;
    text-align: center;
    color: black;
    font-size: 16px;
    outline: none;
  }

  label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    transition: opacity 0.3s ease, top 0.3s ease;
  }

  .MuiInputLabel-shrink {
    top: 0;
    transform: translateY(-100%);
  }
`;

const StyledSearchButton = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:focus {
    outline: none;
  }

  .MuiSvgIcon-root {
    color: black !important;
    transition: color 0.3s ease, box-shadow 0.3s ease;
  }

  &:hover .MuiSvgIcon-root,
  &:active .MuiSvgIcon-root {
    color: white !important;
    border-radius: 50%;
    background-color: rgb(0, 88, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const SearchBar2 = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search button clicked with input:", inputValue);
  };

  return (
    <StyledTextField>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search"
      />
      <StyledSearchButton>
        <SearchIcon />
      </StyledSearchButton>
    </StyledTextField>
  );
};

export default SearchBar2;
