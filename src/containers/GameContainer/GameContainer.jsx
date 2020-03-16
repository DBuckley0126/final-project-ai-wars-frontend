import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpawnerCreatorContainer from "../SpawnerCreatorContainer/SpawnerCreatorContainer";
import GameGridViewContainer from "../GameGridViewContainer/GameGridViewContainer";
import SpawnerOverview from "../../components/SpawnerOverview/SpawnerOverview";
import TurnView from "../../components/TurnView/TurnView";
import EndDisplay from "../../components/EndDisplay/EndDisplay";
import { Frame, AnimatePresence, useAnimation } from "framer";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import acquireColourArray from "../../hooks/acquireColourArray/acquireColourArray";

import {
  initGameOverseerSubscription,
  exitLobby,
  startGameRequest,
  initActionCable
} from "./GameContainerActions";

import "./GameContainer.scss";

const GameContainer = () => {
  console.log("Rendering Game Container");
  const dispatch = useDispatch();
  const hostSideControls = useAnimation();
  const localUserType = useLocalUserType();
  const gameComplete = useSelector(state => state.gameOverseer.gameComplete);
  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);

  let hostUserLobbyColour = lobbyData.attributes.host_user_colour;
  let joinUserLobbyColour = lobbyData.attributes.join_user_colour;

  // const apiToken = useSelector(state => state.auth0.apiToken);

  // const endLobby = () => {
  //   dispatch(exitLobby());
  // };

  // useEffect(() => {
  //   dispatch(initActionCable({ apiToken, dispatch }));
  //   dispatch(
  //     initGameOverseerSubscription({
  //       gameUuid: "a9bb9988-3615-9d2a-8358-625f80a21d49",
  //       requestType: "JOIN_LOBBY"
  //     })
  //   );

  //   return endLobby;
  // }, [apiToken, dispatch]);

  const gameContainerHostSideVariants = {
    unActive: {
      opacity: 0,
      width: "50%"
    },
    active: {
      opacity: 1,
      width: localUserType === "host_user" ? "30%" : "10%",
      transition: {
        opacity: {
          duration: 1,
          delay: 3.5
        },
        duration: 1,
        ease: "easeInOut",
        delay: 5
      }
    }
  };

  const gameContainerJoinSideVariants = {
    unActive: {
      opacity: 0,
      width: "50%"
    },
    active: {
      opacity: 1,
      width: localUserType === "join_user" ? "30%" : "10%",
      transition: {
        opacity: {
          duration: 1,
          delay: 3.5
        },
        duration: 1,
        ease: "easeInOut",
        delay: 5
      }
    }
  };

  const gameContainerTopBarVariants = {
    unActive: {
      y: -100
    },
    active: {
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 7
      }
    }
  };

  const gameContainerExitButtonVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      shadow: "0 0 10px 1px rgba(250, 250, 250, 0.300)",
      transition: {
        duration: 0.5,
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        ease: "easeInOut",
        delay: 3.5
      }
    }
  };

  const gameContainerTitleVariants = {
    unActive: {
      opacity: 0
    },
    active: {
      opacity: 1,
      textShadow: [
        "0 0 12px rgba(250, 250, 250, 0.200)",
        "0 0 10px rgba(250, 250, 250, 0.45)"
      ],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 3,
        textShadow: {
          ease: "easeInOut",
          duration: 2,
          yoyo: Infinity
        }
      }
    }
  };

  const gameContainerBottomBarVariants = {
    unActive: {
      height: "0px"
    },
    active: {
      height: "20px",
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 7
      }
    }
  };

  const gameContainerBottomBarSymbolVariants = {
    unActive: {
      visable: 0
    },
    active: {
      visable: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 8
      }
    }
  };
  // const controlGameContainerHostSideAnimation = () => {
  //   if (true) {
  //     hostSideControls.start("active");
  //   }
  // };

  // controlGameContainerHostSideAnimation();

  const hoverStyle = () => {
    const colour = acquireColourArray();
    return {
      scale: 1.05,
      shadow: colour.shadow,
      backgroundColor: colour.colour
    };
  };

  const spawnerCreatorShieldVariants = {
    unActive: {
      visable: 1,
      opacity: 1
    },
    active: {
      visable: 0,
      opacity: 0,
      x: -5000,
      transition: {
        delay: 9.8,
        duration: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      <Frame
        id="spawner-creator-container-shield"
        key="spawner-creator-container-shield"
        initial="unActive"
        animate="active"
        style={{
          backgroundColor: "",
          width: "100%",
          height: "100%",
          zIndex: 2
        }}
        whileHover={{scale: 1}}
        onClick={()=>{return {scale: 1}}}
        variants={spawnerCreatorShieldVariants}
      ></Frame>
      <Frame
        id="game-container-backdrop"
        key="game-container-backdrop"
        style={{
          backgroundColor: "rgb(19, 19, 19)",
          width: "100%",
          height: "100%",
          zIndex: -1
        }}
      ></Frame>
      <Frame
        id="game-container-top-bar"
        key="game-container-top-bar"
        initial="unActive"
        animate="active"
        style={{
          backgroundColor: "",
          width: "auto",
          left: localUserType === "host_user" ? "30%" : "10%",
          right: localUserType === "host_user" ? "10%" : "30%",
          top: 0,
          height: "105px",
          zIndex: 1
        }}
        variants={gameContainerTopBarVariants}
      >
        <Frame
          id="game-container-title"
          key="game-container-title"
          initial="unActive"
          animate="active"
          style={{
            backgroundColor: "",
            width: "300px",
            height: "80px",
            color: "rgb(232, 232, 232)",
            zIndex: 1,
            fontFamily: "Maven Pro",
            fontSize: "80px",
            fontWeight: "500"
          }}
          variants={gameContainerTitleVariants}
          center
        >
          AI Wars
        </Frame>
        <Frame
          id="game-container-exit-button"
          key="game-container-exit-button"
          initial="unActive"
          animate="active"
          style={{
            backgroundColor: "rgb(232, 232, 232)",
            width: "160px",
            left: "50px",
            height: "60px",
            zIndex: 1,
            fontFamily: "Maven Pro",
            fontSize: "26px",
            fontWeight: "500",
            cursor: "pointer",
            x: 5,
            y: 6
          }}
          variants={gameContainerExitButtonVariants}
          center="y"
          onClick={() => {
            dispatch(exitLobby());
          }}
          whileHover={() => hoverStyle()}
        >
          End Game
        </Frame>
        <TurnView />
      </Frame>
      <Frame
        id="game-container-host-side"
        key="game-container-host-side"
        initial="unActive"
        animate={"active"}
        style={{
          backgroundColor: hostUserLobbyColour,
          height: "100%",
          left: 0,
          shadow: `0px 0px 20px 2px ${hostUserLobbyColour}`
        }}
        variants={gameContainerHostSideVariants}
        center="y"
      >
        {localUserType === "host_user" && <SpawnerCreatorContainer />}
      </Frame>
      <Frame
        id="game-container-join-side"
        key="game-container-join-side"
        initial="unActive"
        animate={"active"}
        style={{
          backgroundColor: joinUserLobbyColour,
          height: "100%",
          right: 0,
          shadow: `0px 0px 20px 2px ${joinUserLobbyColour}`
        }}
        variants={gameContainerJoinSideVariants}
        center="y"
      >
        {localUserType === "join_user" && <SpawnerCreatorContainer />}
      </Frame>

      <Frame
        id="game-container-bottom-bar"
        key="game-container-bottom-bar"
        initial="unActive"
        animate="active"
        whenHovered={{}}
        style={{
          width: "auto",
          left: localUserType === "host_user" ? "55%" : "35%",
          right: localUserType === "host_user" ? "35%" : "55%",
          backgroundColor: localUserType === "host_user" ? hostUserLobbyColour : joinUserLobbyColour,
          shadow: `0px 0px 6px 0px ${localUserType === "host_user" ? hostUserLobbyColour : joinUserLobbyColour}`,
          bottom: 0,
          height: "15px",
          zIndex: 1
        }}
        variants={gameContainerBottomBarVariants}
      >
        {/* <Frame
          id="game-container-bottom-bar-symbol"
          key="game-container-bottom-bar-symbol"
          initial="unActive"
          animate="active"
          style={{
            backgroundColor: "",
            width: "100%",
            bottom: 0,
            height: "20px",
            zIndex: 1,
            fontFamily: "Maven Pro",
            fontSize: "44px",
            fontWeight: "500",
            color: "rgb(105, 105, 105)",
            y: "7px"
          }}
          variants={gameContainerBottomBarSymbolVariants}
        >
          ^
        </Frame> */}
        {/* <SpawnerOverview /> */}
      </Frame>
      <GameGridViewContainer />
      {gameComplete && <EndDisplay />}
    </AnimatePresence>
  );
};

export default GameContainer;
