import React from "react";

import { useSelector, useDispatch } from "react-redux";
import "./GameLobby.scss";

const GameLobby = () => {
  console.log("Game lobby rendered");

  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);

  const renderUserAttributes = user => {
    if (user) {
      return (
        <div className="lobby-user-attributes" alt="User Attributes">
          <img
            src={user.picture}
            alt="User Icon"
            className={"user-profile-picture"}
          ></img>
          <h4>{user.full_name}</h4>
          <h5>{user.skill_rating}</h5>
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
          {renderUserAttributes(lobbyData.attributes.host_user)}
        </div>
        <div className="user-lobby-container join-user-lobby-container">
          {renderUserAttributes(lobbyData.attributes.join_user)}
        </div>
      </div>
    );
  };

  return <>{generateLobbyState()}</>;
};

export default GameLobby;
