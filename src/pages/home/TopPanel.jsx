import React, { useState } from "react";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";


const TopPanel = () => {
  const [showHeading, setShowHeading] = useState(false);

  const topPanelStyle = {
    backgroundColor: "rgb(0, 88, 0)",
    color: "white",
  };

export const headingStyle = {
  color: "white",
};

  const handleSearchClick = () => {
    setShowHeading(true);
  };

  return (
    <Container maxWidth="sm" style={topPanelStyle}>
      <h3 style={headingStyle}> Welcome User!</h3>
      {showHeading && (
        <h5 style={headingStyle}>
          By using this Park & Ride you save X carbon!
        </h5>
      )}
      <div className="search-bar" style={{ paddingBottom: "20px" }}>
        <SearchBar onSearchClick={handleSearchClick} />
      </div>

    </Container>
  );
};

export default TopPanel;
