import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GameInstancesContainer from "../GameInstancesContainer/GameInstancesContainer";
import useActionCable from "../../hooks/useActionCable/useActionCable";
import { joinGame } from "./MenuContainerActions";
import useGameInstancesOverseer from "../../hooks/useGameInstancesOverseer/useGameInstancesOverseer";

const MenuContainer = () => {
  console.log("Rendering Menu Container");
  const apiToken = useSelector(state => state.auth0.apiToken);

  useActionCable(apiToken);
  useGameInstancesOverseer();

  return (
    <div>
      <GameInstancesContainer />
    </div>
  );

  // return <></>
};

export default MenuContainer;
