import { combineReducers } from "redux";
import auth0Reducer from "../reducers/auth0Reducer";
import gameInstancesOverseerReducer from "./gameInstancesOverseerReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  auth0: auth0Reducer,
  gameInstancesOverseer: gameInstancesOverseerReducer,
  app: appReducer
});

export default rootReducer;
