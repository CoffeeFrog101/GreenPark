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
  && {
    .MuiBottomNavigationAction-label {
      color: ${({ active }) => (active ? "white" : "gray")} !important;
    }
    .MuiBottomNavigationAction-root {
      background-color: ${({ active }) => (active ? "white" : "transparent")};
    }
  }
`;

const BottomNavBar = () => {
  const { pathname } = useLocation();

  const navigationItems = [
    { label: "Rewards", value: "/rewards", icon: rewards },
    { label: "Map", value: "/map", icon: map },
    { label: "Profile", value: "/profile", icon: profile },
  ];

  return (
    <Paper elevation={3}>
      <StyledBottomNavigation value={pathname} showLabels>
        {navigationItems.map((item) => (
          <StyledBottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={
              <StyledHoverBubble>
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{ width: "24px", height: "24px" }}
                />
              </StyledHoverBubble>
            }
            component={Link}
            to={item.value}
            active={pathname === item.value}
          />
        ))}
      </StyledBottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
