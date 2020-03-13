import React from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameLobby.scss";
import ReadyUpButton from "../ReadyUpButton/ReadyUpButton";
import LobbyColourPicker from "../LobbyColourPicker/LobbyColourPicker";
import useLocalUserType from "../../hooks/useLocalUserType/useLocalUserType";
import { Frame, AnimatePresence } from "framer";

const GameLobby = () => {
  console.log("Game lobby rendered");

  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);

  const local_user_type = useLocalUserType();

  const hostUserLobbyColour = lobbyData.attributes.host_user_colour;
  const joinUserLobbyColour = lobbyData.attributes.join_user_colour;

  const renderUserAttributes = user => {
    if (user) {
      return (
        <div className="lobby-user-attributes" alt="User Attributes">
          {user.picture && (
            <img
              src={user.picture}
              alt="User Icon"
              className={"user-profile-picture"}
            ></img>
          )}
          {user.full_name && <h4>{user.full_name}</h4>}
          {user.skill_rating && <h5>{user.skill_rating}</h5>}
        </div>
      );
    } else {
      return (
        <div
          className="lobby-user-attributes lobby-user-attributes-waiting"
          alt="User Attributes"
        >
          <h4>Waiting for player to join</h4>
        </div>
      );
    }
  };

  const generateLobbyState = () => {
    const generateHostUserLobbyContainerStyle = () => {
      if (joinUserLobbyColour) {
        return { background: hostUserLobbyColour };
      } else {
        return {};
      }
    };

    const generateJoinUserLobbyContainerStyle = () => {
      if (hostUserLobbyColour) {
        return { background: joinUserLobbyColour };
      } else {
        return {};
      }
    };

    const lobbyContainerVariants = {
      unActive: {
        scale: 0.2,
        shadow: "0 0 0px 0px rgba(250, 250, 250, 0.300)",
        transition: {
          default: { duration: 1, ease: "easeOut" },
          scale: { duration: 1 },
          delay: 4
        }
      },
      active: {
        scale: 1,
        shadow: "0 0 20px 1px rgba(250, 250, 250, 0.300)",
        transition: {
          default: { duration: 1, ease: "easeOut" },
          scale: { duration: 1 },
          delay: 4
        }
      }
    };

    return (
      <AnimatePresence>
        <Frame
          id="lobby-container"
          style={{
            backgroundColor: "rgb(232, 232, 232)",
            display: "flex",
            position: "absolute",
            flexWrap: "nowrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center"
          }}
          width="800px"
          height="800px"
          inital="unActive"
          animate="active"
          variants={lobbyContainerVariants}
          center
        >
          <div
            className="user-lobby-container host-user-lobby-container"
            style={generateHostUserLobbyContainerStyle()}
          >
            <p>Host User</p>
            {lobbyData.attributes.host_user &&
              renderUserAttributes(lobbyData.attributes.host_user)}
            {local_user_type === "host_user" && <LobbyColourPicker />}
          </div>
          <div
            className="user-lobby-container join-user-lobby-container"
            style={generateJoinUserLobbyContainerStyle()}
          >
            {lobbyData.attributes.join_user &&
              renderUserAttributes(lobbyData.attributes.join_user)}
            {local_user_type === "join_user" && <LobbyColourPicker />}
          </div>
          <ReadyUpButton lobbyData={lobbyData} />
        </Frame>
      </AnimatePresence>
    );
  };

  return <>{generateLobbyState()}</>;
};

export default GameLobby;
