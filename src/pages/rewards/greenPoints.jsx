import React from "react";
import Container from "@mui/material/Container";

const GreenPoints = ({ imageSrc, altText, pointsText, description }) => {
  const containerStyle = {
    backgroundColor: "rgb(0, 88, 0)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "50px",
    padding: "12px",
    marginTop: "50px",
    marginBottom: "50px",
    border: "4px solid black",
  };

  const imageStyle = {
    width: "8vh",
    height: "8vh",
    marginRight: "10px",
  };

  const pointsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const pointsTextStyle = {
    fontSize: "1em",
    wordWrap: "break-word",
    textAlign: "center",
    margin: "0",
  };

  const descriptionStyle = {
    fontSize: "1em",
    wordWrap: "break-word",
    textAlign: "justify",
    margin: "0",
    marginLeft: "10px", 
  };

  return (
    <Container maxWidth="sm" style={containerStyle}>
      <img src={imageSrc} alt={altText} style={imageStyle} />
      <div style={pointsContainerStyle}>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </Container>
  );
};

export default GreenPoints;
