import { useDispatch, useSelector } from "react-redux";
import {
  addGameOverseerSub,
  updateErrorForGameOverseer,
  updateSubscribedToGame,
  rejectGameSubscription,
  updateGameLobby
} from "./useGameOverseerActions";

const useGameOverseer = gameId => {
  const dispatch = useDispatch();
  const cable = useSelector(state => state.gameOverseer.cable);
  const userSynced = useSelector(state => state.auth0.synced);
  const user = useSelector(state => state.auth0.user);

  const createSubscription = async () => {
    let gameOverseerSub = null;
    try {
      gameOverseerSub = cable.subscriptions.create(
        { channel: "GameOverseerChannel", game_id: gameId },
        {
          received: function(data) {
            dataHandler(data);
          },
          rejected: function() {
            dispatch(rejectGameSubscription(true));
          },
          unsubscribed: function(data) {
            console.log(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
      dispatch(updateErrorForGameOverseer(true));
    }
    dispatch(addGameOverseerSub(gameOverseerSub));
  };

  const dataHandler = data => {
    switch (data["type"]) {
      case "subscribed":
        switch (data["action"]) {
          case "SUCCESSFULLY_SUBSCRIBED_TO_GAME":
            dispatch(
              updateSubscribedToGame({
                success: true,
                joinedGameId: data.body.game_id
              })
            );
            break;
          default:
            console.log("WARNING: Unable to process data received from socket");
            console.log(data);
        }
        break;
      case "update_game_lobby":
        dispatch(updateGameLobby(data.body));
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

export default useGameOverseer;
