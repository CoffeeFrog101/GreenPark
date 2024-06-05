import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import RewardsIcon from "@mui/icons-material/CardGiftcard";
import ProfileIcon from "@mui/icons-material/AccountCircle";

const BottomNavBar = () => {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels>
      <BottomNavigationAction
        label="Rewards"
        value="rewards"
        icon={<RewardsIcon />}
        component={Link}
        to="/rewards"
      />
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<ProfileIcon />}
        component={Link}
        to="/profile"
      />
    </BottomNavigation>
  );
};

export default BottomNavBar;
