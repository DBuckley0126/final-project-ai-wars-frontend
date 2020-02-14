import { combineReducers } from "redux";
import auth0Reducer from "../reducers/auth0Reducer";
import gameInstancesOverseerReducer from "./gameInstancesOverseerReducer";
import appReducer from "./appReducer";
import gameOverseerReducer from './gameOverseerReducer'

const rootReducer = combineReducers({
  auth0: auth0Reducer,
  gameInstancesOverseer: gameInstancesOverseerReducer,
  app: appReducer,
  gameOverseer: gameOverseerReducer
});

export default rootReducer;
