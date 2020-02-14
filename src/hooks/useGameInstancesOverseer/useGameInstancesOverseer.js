import { useDispatch, useSelector } from "react-redux";
import {
  addGameInstanceOverseerSub,
  updateError,
  updateSubscribedToGameOverseer,
  updateGameInstances
} from "./useGameInstancesOverseerActions";

const useGameInstancesOverseer = () => {
  const dispatch = useDispatch();
  const cable = useSelector(state => state.gameInstancesOverseer.cable);
  const userSynced = useSelector(state => state.auth0.synced);
  const user = useSelector(state => state.auth0.user);

  const createSubscription = async () => {
    let gameInstanceOverseerSub = null;
    try {
      gameInstanceOverseerSub = cable.subscriptions.create(
        { channel: "GameInstancesOverseerChannel" },
        {
          received: function(data) {
            dataHandler(data);
          },
          rejected: function(data) {
            throw data;
          },
          unsubscribed: function(data) {
            console.log(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(updateError(true));
    }
    dispatch(addGameInstanceOverseerSub(gameInstanceOverseerSub));
  };

  const dataHandler = data => {
    switch (data["type"]) {
      case "subscribed":
        switch (data["action"]) {
          case "SUCCESSFULLY_SUBSCRIBED":
            dispatch(updateSubscribedToGameOverseer(true));
            break;
          case "UPDATE_GAME_INSTANCES":
            dispatch(updateGameInstances(data.body));
            break;
          default:
            console.log("WARNING: Unable to process data received from socket");
            console.log(data);
        }
        break;
      default:
        console.log("WARNING: Unable to process data received from socket");
        console.log(data);
    }
  };

  if (user.sub && userSynced === true) {
    createSubscription();
  }
};

export default useGameInstancesOverseer;
