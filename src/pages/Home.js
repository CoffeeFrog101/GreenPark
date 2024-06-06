import React from "react";
import TextField from "@mui/material/TextField";
import Map from "./Map";

const Home = () => {
  return (
    <div className="page-content">
      <div className="text-fields">
        <TextField
          id="filled-basic"
          label="Current Location"
          variant="filled"
        />
        <TextField id="filled-basic" label="Destination" variant="filled" />
      </div>
      <Map />
    </div>
  );
};

export default Home;
