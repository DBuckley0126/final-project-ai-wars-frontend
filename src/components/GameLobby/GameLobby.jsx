import React from "react";

import { useSelector, useDispatch } from "react-redux";

const GameLobby = () => {
  console.log("Game lobby rendered");

  const lobbyData = useSelector(state => state.gameOverseer.lobbyData);

  const generateLobbyState = () => {
    return (
      <div className="lobby-container lobby-container-active">
        <div className="user-lobby-container host-user-lobby-container">
          <h4>{lobbyData.attributes.host_user.full_name}</h4>
        </div>
        <div className="user-lobby-container join-user-lobby-container">
          <h4>{lobbyData.attributes.join_user.full_name}</h4>
        </div>
      </div>
    );
  };

  return <>{generateLobbyState()}</>;
};

export default GameLobby;
