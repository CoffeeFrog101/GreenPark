import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: rgb(228, 242, 234) !important;
  width: 150px;
  height: 40px;
  color: black !important;
  border-radius: 50px !important;

  &:hover {
    background-color: darkgreen !important;
    color: white !important;
  }

  &:active {
    background-color: darkgreen !important;
    color: white !important;
  }
`;

const MapButton = (props) => {
  return <StyledButton variant="contained">{props.text}</StyledButton>;
};

export default MapButton;
