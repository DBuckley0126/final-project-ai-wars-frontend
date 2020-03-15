import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateUserLobbyStatus } from "./ReadyUpButtonActions";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import { Frame, AnimatePresence, useAnimation } from "framer";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";

const ReadyUpButton = props => {
  const lobbyData = props.lobbyData;
  const dispatch = useDispatch();
  const localUserType = useLocalUserType();
  const startGame = useSelector(state => state.app.startGame);
  const showLobby = useSelector(state => state.app.showLobby);

  const controls = useAnimation();

  const readyUpButtonVariants = {
    unActive: {
      scale: 0,
      x: 0,
      shadow: "0px 0px 20px 5px rgba(250, 250, 250, 0)"
    },
    active: {
      scale: 1,
      x: 0,
      fontSize: "24px",
      shadow: "0px 0px 20px 5px rgba(250, 250, 250, 0)",
      transition: {
        duration: 0.4,
        delay: 1.9,
        type: "spring",
        loop: 0,
        repeatDelay: 0
      }
    },
    noReady: {
      x: 0,
      shadow: "0px 0px 20px 5px rgba(250, 250, 250, 0)",
      transition: {
        duration: 0.4,
        delay: 1.8,
        type: "spring",
        loop: 0,
        repeatDelay: 0
      }
    },
    userWaiting: {
      x: [0, -4, 4, 0],
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        yoyo: "Infinity",
        repeatDelay: 2
      }
    },
    timer: {
      scale: [1, 1.2],
      fontSize: "52px",
      shadow: [
        "0px 0px 20px 5px rgba(250, 250, 250, 0)",
        "0px 0px 20px 5px rgba(250, 250, 250, 0.8)"
      ],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        yoyo: "Infinity",
        repeatDelay: 0
      }
    },
    userReady: {
      shadow: [
        "0px 0px 20px 5px rgba(250, 250, 250, 0)",
        "0px 0px 20px 5px rgba(250, 250, 250, 0.8)"
      ],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        yoyo: "Infinity"
      }
    },
    exit: {
      scale: 0,
      x: 0,
      fontSize: "0px",
      shadow: "0px 0px 20px 5px rgba(250, 250, 250, 0)",
      transition: {
        scale:{
          duration: 0.4,
          delay: 0.2,
          type: "spring",
          loop: 0,
          repeatDelay: 0
        },
        duration: 0.2,
        delay: 0,
        type: "spring",
        loop: 0,
        repeatDelay: 0
      }
    },
    hover: {
      scale: 1.04,
      transition: {
        scale: {
          duration: 0.01,
          type: "spring"
        }
      }
    }
  };

  const generateButtonAnimation = () => {
    const state = generateButtonState();

    switch (state) {
      case "TIMER":
        controls.stop("noReady");
        controls.stop("userWaiting");
        controls.stop("userReady");
        controls.start("active");
        controls.start("timer");
        return "timer";
      case "USER_READY":
        controls.stop("timer");
        controls.stop("noReady");
        controls.stop("userWaiting");
        controls.start("active");
        controls.start("userReady");
        return "userReady";
      case "WAITING_FOR_PLAYER":
        controls.stop("timer");
        controls.stop("noReady");
        controls.stop("userReady");
        controls.start("active");
        controls.start("userWaiting");
        return "userWaiting";
      case "NO_READY":
        controls.stop("timer");
        controls.stop("userReady");
        controls.stop("userWaiting");
        controls.start("active");
        controls.start("noReady");
        return "noReady";
      default:
        return;
    }
  };

  const generateButtonState = () => {
    if (
      lobbyData.attributes.host_user_ready &&
      lobbyData.attributes.join_user_ready
    ) {
      return "TIMER";
    } else if (
      lobbyData.attributes.host_user_ready &&
      localUserType === "join_user"
    ) {
      return "WAITING_FOR_PLAYER";
    } else if (
      lobbyData.attributes.join_user_ready &&
      localUserType === "host_user"
    ) {
      return "WAITING_FOR_PLAYER";
    } else if (
      lobbyData.attributes.host_user_ready &&
      localUserType === "host_user"
    ) {
      return "USER_READY";
    } else if (
      lobbyData.attributes.join_user_ready &&
      localUserType === "join_user"
    ) {
      return "USER_READY";
    } else {
      return "NO_READY";
    }
  };

  const generateContent = () => {
    if (
      lobbyData.attributes.host_user_ready &&
      lobbyData.attributes.join_user_ready
    ) {
      return <CountDownTimer />;
    } else if (
      lobbyData.attributes.host_user_ready &&
      localUserType === "join_user"
    ) {
      return "Ready?";
    } else if (
      lobbyData.attributes.join_user_ready &&
      localUserType === "host_user"
    ) {
      return "Ready?";
    } else if (
      lobbyData.attributes.host_user_ready &&
      localUserType === "host_user"
    ) {
      return "Waiting";
    } else if (
      lobbyData.attributes.join_user_ready &&
      localUserType === "join_user"
    ) {
      return "Waiting";
    } else {
      return "Ready?";
    }
  };

  const generateStyle = () => {
    if (generateButtonAnimation() === "timer") {
      return {
        width: "120px",
        height: "120px",
        backgroundColor: "rgb(232, 232, 232)",
        fontSize: "40px",
        fontWeight: "700",
        fontFamily: "Maven Pro",
        cursor: "pointer",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        shadow: "0px 0px 20px 5px rgba(250, 250, 250, 0)"
      };
    } else {
      return {
        width: "120px",
        height: "120px",
        backgroundColor: "rgb(232, 232, 232)",
        fontSize: "24px",
        fontWeight: "500",
        fontFamily: "Maven Pro",
        cursor: "pointer",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        shadow: "0px 0px 20px 5px rgba(250, 250, 250, 0)"
      };
    }
  };

  generateButtonAnimation();
  return (
    <AnimatePresence>
      {!startGame && showLobby && (
        <Frame
          className="ready-up-button"
          style={generateStyle()}
          animate={controls}
          exit="exit"
          onClick={() => {
            dispatch(updateUserLobbyStatus({ readyStatus: "TOGGLE" }));
          }}
          center
          variants={readyUpButtonVariants}
        >
          {generateContent()}
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default ReadyUpButton;
