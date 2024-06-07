import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import map from "./imgs/map.png";
import rewards from "./imgs/rewards.png";
import profile from "./imgs/profile.png";
import styled from "styled-components";

const StyledBottomNavigation = styled(BottomNavigation)`
  && {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: rgb(0, 88, 0) !important;
    color: white !important;
  }
`;

const StyledHoverBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  &:hover {
    background-color: white;
    border-radius: 25%;
  }
  &:active {
    background-color: white;
    border-radius: 25%;
  }
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  .MuiBottomNavigationAction-label {
    color: white !important;
  }
`;

const BottomNavBar = () => {
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <StyledBottomNavigation value={value} onChange={handleChange} showLabels>
        <StyledBottomNavigationAction
          label="Rewards"
          value="/rewards"
          icon={
            <StyledHoverBubble>
              <img
                src={rewards}
                alt="Rewards"
                style={{ width: "24px", height: "24px" }}
              />
            </StyledHoverBubble>
          }
          component={Link}
          to="/rewards"
        />
        <StyledBottomNavigationAction
          label="Map"
          value="/map"
          icon={
            <StyledHoverBubble>
              <img
                src={map}
                alt="Map"
                style={{ width: "24px", height: "24px" }}
              />
            </StyledHoverBubble>
          }
          component={Link}
          to="/map"
        />
        <StyledBottomNavigationAction
          label="Profile"
          value="/profile"
          icon={
            <StyledHoverBubble>
              <img
                src={profile}
                alt="profile"
                style={{ width: "24px", height: "24px" }}
              />
            </StyledHoverBubble>
          }
          component={Link}
          to="/profile"
        />
      </StyledBottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
