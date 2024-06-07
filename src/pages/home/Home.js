import React from "react";
import TextField from "@mui/material/TextField";
import Map from "./Map";
//import BottomNavBar from "./BottomNavBar";
import Container from "@mui/material/Container";
import search from "../imgs/search.png";
import SearchIcon from "@mui/icons-material/Search"; 

console.log(search);

const Home = () => {
  return (
    <div className="page-content">
      <Container maxWidth="sm" className="top-panel">
        <h3> Hello, User!</h3>
        <h5> You've saved X carbon footprint. Keep up the good work!</h5>

        <div className="text-fields">
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
        </div>
      </Container>
      <Map />
    </div>
  );
};
// putting it underneath map here doesn't work
//      <BottomNavBar />

export default Home;
