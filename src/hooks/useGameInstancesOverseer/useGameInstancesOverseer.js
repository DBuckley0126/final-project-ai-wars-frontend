import { useDispatch, useSelector } from "react-redux";
import {
  addGameInstanceOverseerSub,
  updateError
} from "./useGameInstancesOverseerActions";

const useGameInstancesOverseer = () => {
  console.log("sdf")
  const dispatch = useDispatch();
  const cable = useSelector(state => state.gameInstancesOverseer.cable);
  const userSynced = useSelector(state => state.auth0.synced);
  const user = useSelector(state => state.auth0.user);
  console.log(cable)

  const createSubscription = async () => {
    let gameInstanceOverseerSub = null;
    try {
      gameInstanceOverseerSub = cable.subscriptions.create(
        { channel: "GameInstancesOverseerChannel", user_sub: user.sub },
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
      case "":
        break;
      default:
        console.log(data);
    }
  };

  if (user.sub && userSynced === true) {
    createSubscription();
  }
};

export default useGameInstancesOverseer;
