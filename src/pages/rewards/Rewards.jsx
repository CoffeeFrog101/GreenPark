import React from "react";
import FloatingBar from "./FloatingBar";
import rewardsGame from "../imgs/rewardsGame.png";
import RewardsInfo from "./RewardsInfo";

const Rewards = () => {
  return (
    <div className="page-content">
      <RewardsInfo />
      <img
        src={rewardsGame}
        alt="Rewards Game"
        style={{
          width: "40vh",
          height: "40vh",
        }}
      />{" "}
      {}
      <FloatingBar />
    </div>
  );
};

export default Rewards;
