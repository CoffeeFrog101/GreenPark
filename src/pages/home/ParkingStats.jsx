import React from "react";
import Container from "@mui/material/Container";

const ParkingStats = () => {
  const statStyle = {
    backgroundColor: "rgb(0, 88, 0)",
    color: "white",
    textAlign: "center",
    borderRadius: "20px",
    width: "80%",
  };

  const headingStyle = {
    color: "white",
  };

  return (
    <Container maxWidth="sm" style={statStyle}>
      <h5 style={headingStyle}> Site status: </h5>
      <h5 style={headingStyle}> Spaces available: </h5>
    </Container>
  );
};

export default ParkingStats;
