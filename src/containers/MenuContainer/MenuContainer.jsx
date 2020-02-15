import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstancesContainer from "../GameInstancesContainer/GameInstancesContainer";
import { initActionCable } from "./MenuContainerActions";

import GameLobby from "../../components/GameLobby/GameLobby";

const MenuContainer = () => {
  console.log("Rendering Menu Container");

  const dispatch = useDispatch();
  const apiToken = useSelector(state => state.auth0.apiToken);
  const cable = useSelector(state => state.gameInstancesOverseer.cable);

  useEffect(() => {
    dispatch(initActionCable(apiToken));
  }, [apiToken, dispatch]);

  const lobbyDataRetrieved = useSelector(
    state => state.gameOverseer.lobbyDataRetrieved
  );

  const renderGameLobby = () => {
    if (lobbyDataRetrieved) {
      return <GameLobby />;
    }
    return null;
  };

  const renderGameInstances = () => {
    if (cable) {
      return <GameInstancesContainer />;
    }
  };

  return (
    <div className="menu-container">
      {renderGameInstances()}
      {renderGameLobby()}
    </div>
  );
};

export default MenuContainer;
