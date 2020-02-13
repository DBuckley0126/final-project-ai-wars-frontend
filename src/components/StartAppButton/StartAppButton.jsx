import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startApp } from "./startAppButtonActions";

const StartAppButton = () => {
  const dispatch = useDispatch();
  const userSynced = useSelector(state => state.auth0.synced);

  const handleClick = event => {
    dispatch(startApp());
  };

  if (!userSynced) {
    return null;
  }

  return <button onClick={event => handleClick(event)}>Enter</button>;
};

export default StartAppButton;
