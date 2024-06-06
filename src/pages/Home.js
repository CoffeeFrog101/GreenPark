import React from "react";
import TextField from "@mui/material/TextField";
import Map from "./Map";
//import BottomNavBar from "./BottomNavBar";

const Home = () => {
  return (
    <div className="page-content">
      <div className="text-fields">
        <TextField id="filled-basic" label="Destination" variant="filled" />
      </div>
      <Map />
    </div>
  );
};
// putting it underneath map here doesn't work
//      <BottomNavBar />

export default Home;
