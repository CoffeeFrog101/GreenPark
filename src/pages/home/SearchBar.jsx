import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./searchbar.css";
import search from "../imgs/search.png";

console.log(search);

const SearchBar = () => {
  return (
    <div className="search-container">
      <TextField
        id="searchbar"
        label="Enter Destination"
        variant="filled"
        InputLabelProps={{
          className: "white-label",
        }}
      />
      <SearchIcon className="search-icon" />
    </div>
  );
};

export default SearchBar;
