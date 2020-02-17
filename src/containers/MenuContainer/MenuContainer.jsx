import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstancesContainer from "../GameInstancesContainer/GameInstancesContainer";
import { initActionCable } from "./MenuContainerActions";

import GameLobby from "../../components/GameLobby/GameLobby";
import GeneralButton from "../../components/GeneralButton/GeneralButton";

import "./MenuContainer.scss";

const MenuContainer = () => {
  console.log("Rendering Menu Container");

  const dispatch = useDispatch();
  const apiToken = useSelector(state => state.auth0.apiToken);
  const cable = useSelector(state => state.gameInstancesOverseer.cable);

  useEffect(() => {
    dispatch(initActionCable({ apiToken, dispatch }));
  }, [apiToken, dispatch]);

  const subscriptionActive = useSelector(
    state => state.gameOverseer.subscriptionActive
  );

  const renderGameLobby = () => {
    if (subscriptionActive) {
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
      <GeneralButton />
      {renderGameInstances()}
      {renderGameLobby()}
    </div>
  );
};

export default MenuContainer;
