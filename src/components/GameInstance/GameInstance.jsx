import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GameInstance.scss";
import { initGameOverseerSubscription } from "./GameInstanceActions";
var diff = require("deep-diff").diff;

const GameInstance = props => {
  console.log(`GAME INSTANCE RENDERED ${props.gameInstance.id}`);
  const gameInstance = props.gameInstance;

  const dispatch = useDispatch();
  const cable = useSelector(state => state.gameOverseer.cable);

  const generate_game_instance_view = () => {
    if (gameInstance.attributes.capacity === "WAITING") {
      return (
        <div
          className={"game-instance-overview game-instance-overview-waiting"}
        >
          <p>{gameInstance.id}</p>
          <img
            src={gameInstance.attributes.host_user.picture}
            alt="Host User Profile"
            className={"user-profile-picture"}
          ></img>
          <h4>{gameInstance.attributes.host_user.give_name}</h4>
          <h5>{gameInstance.attributes.host_user.skill_rating}</h5>

          <button
            onClick={() => {
              console.log("Join button clicked");
              dispatch(
                initGameOverseerSubscription(
                  { gameId: gameInstance.id, requestType: "JOIN_GAME" },
                  cable,
                  dispatch
                )
              );
            }}
          >
            Join
          </button>
        </div>
      );
    } else if (gameInstance.attributes.capacity === "FULL") {
      return (
        <div className={"game-instance-overview game-instance-overview-full"}>
          <p>{gameInstance.id}</p>
          <img
            src={gameInstance.attributes.host_user.picture}
            alt="Host User Profile"
            className={"user-profile-picture"}
          ></img>
          <h4>FULL</h4>
          <img
            src={gameInstance.attributes.join_user.picture}
            alt="Join User Profile"
            className={"user-profile-picture"}
          ></img>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return generate_game_instance_view();
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
