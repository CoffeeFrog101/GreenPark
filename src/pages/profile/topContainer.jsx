import React from "react";
import Container from "@mui/material/Container";
import profile from "../imgs/profileicon.png";

const TopContainer = ({ children }) => {
  const ctnrStyle = {
    backgroundColor: "rgb(0, 88, 0)",
    textAlign: "center",
    width: "100%",
  };

  const headingStyle = {
    color: "white",
    fontSize: "20px",
  };

  return (
    <Container maxWidth="sm" sx={ctnrStyle}>
      {children}
      <h5 style={headingStyle}> Username </h5>
      <img
        src={profile}
        alt="Profile pic"
        style={{
          width: "15vh",
          height: "15vh",
          marginBottom: "20px",
        }}
      />
    </Container>
  );
};

export default TopContainer;
