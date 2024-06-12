import React from "react";
import styled from "styled-components";

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 2em;
  left: 0;
  height: 2em;
  width: 100%;
  line-height: 2em;
  color: #fff;
`;

const FloatingLabel = styled.label`
  background: yellow;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const FloatingList = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
  transition: bottom 0.1s ease-in;
  list-style: none;
  margin: 0;
  padding: 0;
  background: darkgreen;
`;

const FloatingListItem = styled.li`
  height: auto;
  background: white;
  color: darkgreen;
  border-radius: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5em 0;
  padding: 0.5em;
  text-align: center;

  h3 {
    margin: 0;
    font-size: 1.2em;
  }

  p {
    margin: 0;
    font-size: 0.8em;
    color: darkgreen;
  }
`;

const FloatingInput = styled.input`
  &[type="checkbox"]:checked + ul {
    bottom: 2em; /* Show the floating list when the checkbox is checked */
  }
`;

const FloatingBar = () => {
  return (
    <FloatingContainer id="floating">
      <FloatingLabel htmlFor="toggle">Floating bar here</FloatingLabel>
      <FloatingInput type="checkbox" id="toggle" hidden />
      <FloatingList>
        <FloatingListItem>
          <h3>Leaderboard</h3>
          <p>Challenge your mates!</p>
        </FloatingListItem>
        <FloatingListItem>
          <h3>Greenstats</h3>
          <p>Track your progress!</p>
        </FloatingListItem>
        <FloatingListItem>
          <h3>Rewards & Offers</h3>
          <p>See what you can unlock!</p>
        </FloatingListItem>
      </FloatingList>
    </FloatingContainer>
  );
};

export default FloatingBar;
