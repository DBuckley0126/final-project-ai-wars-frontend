import { delay } from "redux-saga";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

import * as importedActions from "./gameInstancesOverseerSubscriptionActions";

export default function* gameInstancesOverseerCable0Watchers() {
  yield takeLatest(
    "INIT_GAME_INSTANCES_OVERSEER_SUBSCRIPTION",
    initGameInstancesOverseerSubscription
  );
}

function* initGameInstancesOverseerSubscription(action) {
  const cable = action.cable;
  const actions = importedActions;
  const dispatch = action.dispatch;
  const userSynced = action.userSynced;

  // const userSynced = useSelector(state => state.auth0.synced);  //NEED

  let gameInstanceOverseerSub = null;

  try {
    if (userSynced === false) throw "ERROR: User is not synced to database";

    gameInstanceOverseerSub = cable.subscriptions.create(
      { channel: "GameInstancesOverseerChannel" },
      {
        received: function(data) {
          dataHandler(data);
        },
        rejected: function() {
          console.log(
            "ERROR: Game instance overseer subscription rejected from server"
          );
          dispatch(action.rejectGameInstancesOverseerSubscription(true));
        },
        unsubscribed: function(data) {
          console.log(data);
        }
      }
    );
    yield put(actions.addGameInstanceOverseerSub(gameInstanceOverseerSub));
  } catch (error) {
    console.log(error);
    yield put(action.updateErrorForGameInstancesOverseer(true));
  }

  const dataHandler = data => {
    switch (data["type"]) {
      case "subscribed":
        switch (data["action"]) {
          case "SUCCESSFULLY_SUBSCRIBED":
            dispatch(actions.updateSubscribedToGameOverseer(true));
            break;
          default:
            console.log("WARNING: Unable to process data received from socket");
            console.log(data);
        }
        break;
      case "update_game_instances":
        dispatch(actions.updateGameInstances(data.body));
        break;
      default:
        console.log("WARNING: Unable to process data received from socket");
        console.log(data);
    }
  };
}
