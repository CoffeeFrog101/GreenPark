import React from "react";
import Container from "@mui/material/Container";

const ParkingStats = ({ markers, searchTerm }) => {
  const statStyle = {
    backgroundColor: "rgb(0, 88, 0)",
    color: "white",
    textAlign: "center",
    borderRadius: "50px",
    width: "50%",
  };

  const headingStyle = {
    color: "white",
  };
  const selectedMarker = markers.find((marker) =>
    marker.name.toLowerCase().includes(searchTerm)
  );

  if (!selectedMarker) {
    return (
      <Container maxWidth="sm" style={statStyle}>
        No park selected
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" style={statStyle}>
      <h5 style={headingStyle}> Park name: {selectedMarker.name}</h5>
      <h5 style={headingStyle}> Site status: {selectedMarker.status} </h5>
      <h5 style={headingStyle}>
        Spaces available: {selectedMarker.ParkingSpots}
      </h5>
    </Container>
  );
};

export default ParkingStats;
