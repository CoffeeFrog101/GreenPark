import React from "react";
import Map from "./Map";
//import BottomNavBar from "./BottomNavBar";
import TopPanel from "./TopPanel";

const Home = () => {
  return (
    <div className="page-content">
      <TopPanel />
      <Map />
    </div>
  );
};

// ADD SPACE BETWEEN CONTAINER AND MAP -  MARGINS**

// putting it underneath map here doesn't work
//      <BottomNavBar />

export default Home;
