import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GameInstance.scss";
import { initGameOverseerSubscription } from "./GameInstanceActions";
import { Frame, AnimatePresence } from "framer";
import acquireColourArray from "../../hooks/acquireColourArray/acquireColourArray";
var diff = require("deep-diff").diff;

const GameInstance = props => {
  console.log(`GAME INSTANCE RENDERED ${props.gameInstance.id}`);
  const gameInstance = props.gameInstance;

  const dispatch = useDispatch();

  const hoverStyle = () => {
    const colour = acquireColourArray();
    return {
      shadow: colour.shadow,
      backgroundColor: colour.colour,
      width: "100%",
      height: "100%",
      right: "0px",
      className: "game-instance-join-button-highlighted"
    };
  };

  const generateUserName = user => {
    if (user.given_name) {
      return user.given_name;
    } else {
      return user.nickname;
    }
  };

  const gameInstanceVariants = {
    unActive: {
      opacity: 0,
      height: "0px"
    },
    active: {
      opacity: 1,
      height: "180px",
      transition: {
        opacity: { delay: 0.8 },
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const generateGameInstanceView = () => {
    if (gameInstance.attributes.capacity === "WAITING") {
      return (
        <AnimatePresence>
          <Frame
            className={"game-instance-overview game-instance-overview-waiting"}
            style={{
              display: "flex",
              backgroundColor: "rgb(214, 214, 214)",
              position: "relative",
              width: "700px",
              height: "180px",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              marginTop: "10px",
              marginBottom: "10px"
            }}
            initial={"unActive"}
            animate={"active"}
            exit={"unActive"}
            center="x"
            transition={{
              default: { duration: 1, ease: "easeOut" },
              scale: { duration: 0.2 },
              backgroundColor: { duration: 0.4, ease: "easeOut" }
            }}
            variants={gameInstanceVariants}
          >
            <Frame
              className="game-instance-join-button"
              whileHover={() => hoverStyle()}
              onClick={() => {
                dispatch(
                  initGameOverseerSubscription({
                    gameUuid: gameInstance.attributes.uuid,
                    requestType: "JOIN_LOBBY"
                  })
                );
              }}
              style={{
                width: "100px",
                height: "100px",
                right: "40px",
                backgroundColor: "rgb(191, 191, 191)",
                cursor: "pointer"
              }}
            >
              Join
            </Frame>

            <img
              src={gameInstance.attributes.host_user.picture}
              alt="Host User Profile"
              className={"user-profile-picture"}
            ></img>
            <h4 className="game-instance-user-name">
              {generateUserName(gameInstance.attributes.host_user)}
            </h4>
            <h5 className="game-instance-skill-rating">
              {gameInstance.attributes.host_user.skill_rating}
            </h5>
          </Frame>
        </AnimatePresence>
      );
    } else if (gameInstance.attributes.capacity === "FULL") {
      return (
        <AnimatePresence>
          <Frame
            className={"game-instance-overview game-instance-overview-full"}
            style={{
              display: "flex",
              backgroundColor: "rgb(167, 167, 167)",
              position: "relative",
              width: "700px",
              height: "180px",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              marginTop: "10px",
              marginBottom: "10px"
            }}
            initial={"unActive"}
            animate={"active"}
            exit={"unActive"}
            center="x"
            variants={gameInstanceVariants}
          >
            <img
              src={gameInstance.attributes.host_user.picture}
              alt="Host User Profile"
              className={"user-profile-picture host-user-profile-picture"}
            ></img>
            <h4 className="game-instance-capacity">FULL</h4>
            <img
              src={gameInstance.attributes.join_user.picture}
              alt="Join User Profile"
              className={"user-profile-picture join-user-profile-picture"}
            ></img>
          </Frame>
        </AnimatePresence>
      );
    } else {
      return <></>;
    }
  };

  return generateGameInstanceView();
};

function areEqual(prevProps, nextProps) {
  let differences = diff(prevProps, nextProps);
  return differences ? false : true;

  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default React.memo(GameInstance, areEqual);
