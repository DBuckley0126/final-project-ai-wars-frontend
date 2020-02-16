import React from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameLobby.scss";
import ReadyUpButton from "../ReadyUpButton/ReadyUpButton";

const GameLobby = () => {
  console.log("Game lobby rendered");

  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);

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
    return (
      <div className="lobby-container">
        <div className="user-lobby-container host-user-lobby-container">
          <p>Host User</p>
          {lobbyData.attributes.host_user &&
            renderUserAttributes(lobbyData.attributes.host_user)}
        </div>
        <div className="user-lobby-container join-user-lobby-container">
          {lobbyData.attributes.join_user &&
            renderUserAttributes(lobbyData.attributes.join_user)}
        </div>
        <ReadyUpButton lobbyData={lobbyData} />
      </div>
    );
  };

  return <>{generateLobbyState()}</>;
};

export default GameLobby;
