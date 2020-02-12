import { combineReducers } from "redux";
import testReducer from "../reducers/testReducer";
import auth0Reducer from "../reducers/auth0Reducer";

const rootReducer = combineReducers({
  testReducer: testReducer,
  auth0: auth0Reducer
});

export default rootReducer;