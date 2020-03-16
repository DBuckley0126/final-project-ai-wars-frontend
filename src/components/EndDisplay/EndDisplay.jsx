import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import { Frame, AnimatePresence, useAnimation } from "framer";

import { exitLobby } from "./EndDisplayActions";

import "./EndDisplay.scss";

const EndDisplay = () => {
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);
  const gameData = useSelector(state => state.gameOverseer.gameData);
  const local_user = useSelector(state => state.auth0.user);

  let hostUserLobbyColour = lobbyData.attributes.host_user_colour;
  let joinUserLobbyColour = lobbyData.attributes.join_user_colour;

  const dispatch = useDispatch();

  const localUserType = useLocalUserType();

  const generateTitle = () => {
    if (gameData.game.attributes.winner_user_sub === local_user.sub) {
      return "You Won";
    } else {
      return "You Lost";
    }
  };

  const generateWins = () => {
    if (localUserType === "host_user") {
      return lobbyData.attributes.host_user.wins;
    } else {
      return lobbyData.attributes.join_user.wins;
    }
  };

  const generateLosses = () => {
    if (localUserType === "host_user") {
      return lobbyData.attributes.host_user.losses;
    } else {
      return lobbyData.attributes.join_user.losses;
    }
  };

  const generateBackgroundColor = () => {
    if (gameData.game.attributes.winner_user_sub === local_user.sub) {
      if (localUserType === "host_user") {
        return hostUserLobbyColour;
      } else {
        return joinUserLobbyColour;
      }
    } else {
      if (localUserType === "host_user") {
        return joinUserLobbyColour;
      } else {
        return hostUserLobbyColour;
      }
    }
  };

  const handleExitClick = () => {
    dispatch(exitLobby());
  };

  const endBackgroundVariants = {
    unActive: {
      x: generateBackgroundColor() === hostUserLobbyColour ? "-100%" : "100%",
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    },
    active: {
      x: "0%",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Frame
      id="end-background"
      key="end-background"
      backgroundColor={generateBackgroundColor()}
      style={{
        width: "100%",
        height: "100%",
        opacity: 1,
        zIndex: 1
      }}
      initial="unActive"
      animate="active"
      exit="unActive"
      variants={endBackgroundVariants}
      center
      whileHover={{scale: 1}}
      onClick={()=>{return {scale: 1}}}
    >
      <Frame
        id="end-display-title"
        key="end-display-title"
        style={{
          width: "900px",
          height: "200px",
          color: "rgb(232, 232, 232)",
          fontFamily: "Maven Pro",
          fontSize: "160px",
          y: "-200px",
          fontWeight: "700",
          backgroundColor: ""
        }}
        center
      >
        {generateTitle()}
      </Frame>

      <Frame
        id="end-display-wins"
        key="end-display-wins"
        style={{
          width: "400px",
          height: "300px",
          color: "rgb(232, 232, 232)",
          fontFamily: "Maven Pro",
          fontSize: "100px",
          y: "80px",
          x: "-200px",
          fontWeight: "700",
          backgroundColor: ""
        }}
        center
      >
        <Frame
          id="end-display-wins-title"
          key="end-display-wins-title"
          style={{
            width: "400px",
            height: "300px",
            color: "rgb(232, 232, 232)",
            fontFamily: "Maven Pro",
            fontSize: "50px",
            y: "-100px",
            fontWeight: "500",
            backgroundColor: ""
          }}
          center
        >
          Games Won
        </Frame>
        <Frame
          id="end-display-wins-count"
          key="end-display-wins-count"
          style={{
            width: "200px",
            height: "200px",
            color: "rgb(232, 232, 232)",
            fontFamily: "Maven Pro",
            fontSize: "60px",
            y: "-10px",
            fontWeight: "700",
            backgroundColor: ""
          }}
          center
        >
          {generateWins()}
        </Frame>
      </Frame>
      <Frame
        id="end-display-losses"
        key="end-display-losses"
        style={{
          width: "400px",
          height: "300px",
          color: "rgb(232, 232, 232)",
          fontFamily: "Maven Pro",
          fontSize: "100px",
          y: "80px",
          x: "200px",
          fontWeight: "700",
          backgroundColor: ""
        }}
        center
      >
        <Frame
          id="end-display-losses-title"
          key="end-display-losses-title"
          style={{
            width: "400px",
            height: "300px",
            color: "rgb(232, 232, 232)",
            fontFamily: "Maven Pro",
            fontSize: "50px",
            y: "-100px",
            fontWeight: "500",
            backgroundColor: ""
          }}
          center
        >
          Games Lost
        </Frame>
        <Frame
          id="end-display-losses-count"
          key="end-display-losses-count"
          style={{
            width: "200px",
            height: "200px",
            color: "rgb(232, 232, 232)",
            fontFamily: "Maven Pro",
            fontSize: "60px",
            y: "-10px",
            fontWeight: "700",
            backgroundColor: ""
          }}
          center
        >
          {generateLosses()}
        </Frame>
      </Frame>

      <Frame
        id="end-display-button"
        key="end-display-button"
        style={{
          backgroundColor: "rgb(232, 232, 232)",
          width: "160px",
          height: "60px",
          zIndex: 1,
          shadow: "rgba(250, 250, 250, 0.3) 0px 0px 6px 1px",
          fontFamily: "Maven Pro",
          fontSize: "26px",
          fontWeight: "500",
          cursor: "pointer",
          y: "250px"
        }}
        whileHover={{
          scale: 1.1,
          shadow: "rgba(250, 250, 250, 0.6) 0px 0px 6px 1px"
        }}
        center
        onClick={() => handleExitClick()}
      >
        Exit
      </Frame>
    </Frame>
  );
};

export default EndDisplay;
