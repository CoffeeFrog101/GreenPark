import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Center content horizontally */
`;

const StyledTextField = styled(TextField)`
  && {
    border-radius: 25px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    margin: auto;
  }

  .MuiInputLabel-root {
    color: white !important;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: white;
`;
// MAKE ENTER DESTINATION GO IN THE CENTER **
const SearchBar = ({ onSearchChange }) => {
  return (
    <SearchContainer>
      <StyledTextField
        id="searchbar"
        label="Enter Destination"
        variant="filled"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <StyledSearchIcon />
    </SearchContainer>
  );
};

export default SearchBar;
