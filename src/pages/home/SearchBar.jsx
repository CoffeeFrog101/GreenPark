import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100% !important;
`;

const StyledTextField = styled(TextField)`
  && {
    border-radius: 25px;
    width: 130% !important;
    background-color: rgba(255, 255, 255, 0.5);
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

const SearchBar = ({ onSearchChange }) => {
  return (
    <SearchContainer>
      <StyledTextField
        id="searchbar"
        label="Enter Destination"
        variant="filled"
        InputLabelProps={{
          className: "white-label",
        }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <StyledSearchIcon />
    </SearchContainer>
  );
};

export default SearchBar;
