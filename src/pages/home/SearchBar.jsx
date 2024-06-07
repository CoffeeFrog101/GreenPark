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
    opacity: ${({ hasInput }) => (hasInput ? 0 : 1)};
  }

  .MuiSvgIcon-root {
    color: black; /* Change the color of the search icon to black */
  }

  .MuiInputLabel-shrink {
    top: 0; /* Position label at the top when shrinking */
    transform: translateY(-100%); /* Adjust positioning to avoid shifting */
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
    color: white; /* Change the color of the search icon to white */
  }
`;

const CustomTextField = ({ onSearchClick }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <StyledTextField hasInput={inputValue.length > 0}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter Destination"
      />
      <StyledSearchButton onClick={handleSearchClick}>
        <SearchIcon />
      </StyledSearchButton>
    </StyledTextField>
  );
};

export default CustomTextField;
