import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GeneralButton.scss";
import acquireColourArray from "../../hooks/acquireColourArray/acquireColourArray";

import {
  exitLobby,
  initGameOverseerSubscription
} from "./GeneralButtonActions";
import { AnimatePresence, Frame } from "framer";

const GeneralButton = () => {
  const startGame = useSelector(state => state.app.startGame);
  const gameSubscriptionActive = useSelector(
    state => state.gameOverseer.subscriptionActive
  );

  const handleClick = () => {
    if (gameSubscriptionActive) {
      dispatch(exitLobby());
    } else {
      dispatch(
        initGameOverseerSubscription({
          requestType: "CREATE_LOBBY"
        })
      );
    }
  };

  const dispatch = useDispatch();

  const hoverStyle = () => {
    const colour = acquireColourArray();
    return {
      scale: 1.05,
      shadow: colour.shadow,
      backgroundColor: colour.colour
    };
  };

  const generalButtonVariants = {
    unActive: {
      opacity: 0,
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        opacity: { duration: 1, ease: "easeOut", delay: 1 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    },
    active: {
      opacity: 1,
      shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2, type: "spring", stiffness: 200 },
        opacity: { duration: 1, ease: "easeOut", delay: 2.5 },
        shadow: { duration: 1, ease: "easeOut", delay: 3 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    },
    exit: {
      opacity: 0,
      shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        opacity: { duration: 0.5, ease: "easeOut", delay: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" }
      }
    }
  };

  const generalButtonContentsVariants = {
    unActive: {
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        rotate: { duration: 0.3, type: "spring" }
      }
    },
    activeQuit: {
      rotate: 0,
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        rotate: { duration: 0.3, type: "spring" }
      }
    },
    activeAdd: {
      rotate: 45,
      transition: {
        default: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.4, ease: "easeOut" },
        rotate: { duration: 0.3, type: "spring" }
      }
    }
  };

  const generateAnimationState = () => {
    if (gameSubscriptionActive) {
      return "activeAdd";
    } else {
      return "activeQuit";
    }
  };

  return (
    <AnimatePresence>
      {!startGame && (
        <Frame
          id="general-button"
          key="general-button"
          onClick={() => handleClick()}
          initial={"unActive"}
          whileHover={() => hoverStyle()}
          animate={"active"}
          exit={"exit"}
          style={{
            backgroundColor: "rgba(232, 232, 232, 1)",
            width: "130px",
            height: "130px",
            position: "absolute",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "baseline",
            alignContent: "center",
            cursor: "pointer"
          }}
          center
          x="-540px"
          y="0px"
          variants={generalButtonVariants}
        >
          <Frame
            id="general-button-contents"
            style={{
              fontSize: "100px",
              width: "130px",
              height: "130px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "rgba(0, 0, 0, 1)",
              textAlign: "center",
              alignItems: "none"
            }}
            initial={"unActive"}
            animate={generateAnimationState()}
            center
            variants={generalButtonContentsVariants}
          >
            +
          </Frame>
        </Frame>
      )}
    </AnimatePresence>
  );
};

export default GeneralButton;
