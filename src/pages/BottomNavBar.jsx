import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link, useLocation } from "react-router-dom";
import RewardsIcon from "@mui/icons-material/CardGiftcard";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import map from "./imgs/map.png";
//import rewards from "./imgs/rewards.png";
//import profile from "./imgs/profile.png";

/* MAKE THIS ENTIRE THING GREEN AND ADJUST IT */ 
const BottomNavBar = () => {
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(pathname);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction
          label="Rewards"
          value="/rewards"
          icon={<RewardsIcon />}
          component={Link}
          to="/rewards"
        />
        {}
        <BottomNavigationAction
          label="Map"
          value="/map"
          icon={
            <img
              src={map}
              alt="Map"
              style={{ width: "24px", height: "24px" }}
            />
          }
          component={Link}
          to="/map"
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<ProfileIcon />}
          component={Link}
          to="/profile"
          focusRipple={true}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;

/* <BottomNavigationAction
label="Rewards"
value="/rewards"
icon={
  <img
    src={rewards}
    alt="Rewards"
    style={{ width: "24px", height: "24px" }}
  />
}
component={Link}
to="/rewards"
/>

<BottomNavigationAction
label="Profile"
value="/profile"
icon={
  <img
    src={profile}
    alt="profile"
    style={{ width: "24px", height: "24px" }}
  />
}
component={Link}
to="/profile"
/> */
