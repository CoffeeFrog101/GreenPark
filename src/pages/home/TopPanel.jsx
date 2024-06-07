import React from "react";
import Container from "@mui/material/Container";
import SearchBar from "./SearchBar";

export const topPanelStyle = {
  backgroundColor: "rgb(0, 88, 0)",
  color: "white",
};

export const headingStyle = {
  color: "white",
};

const TopPanel = ({ panel, head, children }) => {
  return (
    <Container maxWidth="sm" style={panel}>
      <h3 style={head}> Welcome User!</h3>
      <h5 style={head}>By using this Park & Ride you save X carbon!</h5>
      <div className="text-fields">{children}</div>
    </Container>
  );
};

export default TopPanel;
