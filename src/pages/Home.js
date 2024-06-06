import React from "react";
import TextField from "@mui/material/TextField";
import Map from "./Map";
//import BottomNavBar from "./BottomNavBar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./pages.css";

const Home = () => {
  return (
    <div className="page-content">
      <div className="text-fields">
        <TextField id="filled-basic" label="Destination" variant="filled" />
      </div>
      <Stack direction="row" spacing={0}>
        <Button variant="contained" className="home-buttons">
          Bus stops
        </Button>
        <Button variant="contained" className="home-buttons">
          Tram stops
        </Button>
      </Stack>
      <Map />
    </div>
  );
};
// putting it underneath map here doesn't work
//      <BottomNavBar />

export default Home;
