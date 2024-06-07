import React from "react";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";

const TopPanel = () => {
  const topPanelStyle = {
    backgroundColor: "rgb(0, 88, 0)",
    color: "white",
  };

  const headingStyle = {
    color: "white",
  };

  return (
    <Container maxWidth="sm" style={topPanelStyle}>
      <h3 style={headingStyle}> Welcome User!</h3>
      <h5 style={headingStyle}>
        {" "}
        By using this Park & Ride you save X carbon!{" "}
      </h5>
      <div className="text-fields">
        <SearchBar />
      </div>
    </Container>
  );
};

export default TopPanel;
