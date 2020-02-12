import React from "react";
import _ from "actioncable"
import { useSelector } from "react-redux";

const ActionCableButton = () => {
  const { isLoading, user, loginWithRedirect, logout } = useSelector(
    state => state.auth0
  );

  let cable = null;

  const addUserParams = () => {
    console.log(user)
    return `?user=${ {...user} }`;
  };

  const handleClick = event => {
    console.log("Button clicked");
    if (window.location.hostname === "localhost") {
      cable = _.createConsumer(`ws://localhost:3000/cable${addUserParams()}`);
    } else {
      cable = _.createConsumer(
        `wss://javascript-project-gyro-back.herokuapp.com/cable${addUserParams()}`
      );
    }
    console.log(cable);
  };

  return (
    <button onClick={event => handleClick(event)}>Iniciate Cable Connection</button>
  );
};

export default ActionCableButton;
