import React from "react";
import { Grid, Button } from "@mui/material";
import styled from "styled-components";
import userInfo from "../imgs/userInfo.png";
import vehicleInfo from "../imgs/vehicleInfo.png";
import usageHistory from "../imgs/usageHistory.png";
import paymentInfo from "../imgs/paymentInfo.png";
import preferences from "../imgs/preferences.png";
import settings from "../imgs/settings.png";

const StyledButton = styled(Button)`
  background-color: rgb(0, 88, 0) !important;
  color: white !important;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: start;
  align-items: baseline;
  text-transform: none;
  font-size: 14px;
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 20px;
  height: auto;
  margin-right: 10px;
`;

const ButtonGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <Icon src={userInfo} />
          User Information
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <Icon src={vehicleInfo} />
          Vehicle Information
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <Icon src={usageHistory} />
          Usage History
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <Icon src={paymentInfo} />
          Payment Information
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <Icon src={preferences} />
          Preferences
        </StyledButton>
      </Grid>
      <Grid item xs={6}>
        <StyledButton variant="contained">
          <Icon src={settings} />
          Settings
        </StyledButton>
      </Grid>
    </Grid>
  );
};

export default ButtonGrid;
