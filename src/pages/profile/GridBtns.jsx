import React from "react";
import { Grid, Button } from "@mui/material";
import styled from "styled-components";
import userInfo from "../imgs/userInfo.png";
import vehicleInfo from "../imgs/vehicleInfo.png";
import usageHistory from "../imgs/usageHistory.png";
import paymentInfo from "../imgs/paymentInfo.png";
import preferences from "../imgs/preferences.png";
import settings from "../imgs/settings.png";
import arrows from "../imgs/arrows.png";

const StyledButton = styled(Button)`
  background-color: rgb(0, 88, 0) !important;
  color: white !important;
  width: 100%;
  height: auto; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  text-transform: none;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px; 

  &:hover {
    border: 4px solid black;
  }

  &:active {
    border: 4px solid black;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: auto;
  margin-right: 10px;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: auto;
  margin-left: auto;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between; /* Ensures even spacing between icons */
`;

const ButtonGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <IconWrapper>
            <Icon src={userInfo} />
            <ArrowIcon src={arrows} />
          </IconWrapper>
          <span>User Information</span>
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <IconWrapper>
            <Icon src={vehicleInfo} />
            <ArrowIcon src={arrows} />
          </IconWrapper>
          <span>Vehicle Information</span>
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <IconWrapper>
            <Icon src={usageHistory} />
            <ArrowIcon src={arrows} />
          </IconWrapper>
          <span>Usage History</span>
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <IconWrapper>
            <Icon src={paymentInfo} />
            <ArrowIcon src={arrows} />
          </IconWrapper>
          <span>Payment Information</span>
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <IconWrapper>
            <Icon src={preferences} />
            <ArrowIcon src={arrows} />
          </IconWrapper>
          <span>Preferences</span>
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <IconWrapper>
            <Icon src={settings} />
            <ArrowIcon src={arrows} />
          </IconWrapper>
          <span>Settings</span>
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default ButtonGrid;
