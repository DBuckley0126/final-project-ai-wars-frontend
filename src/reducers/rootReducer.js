import { combineReducers } from "redux";
import testReducer from '../reducers/testReducer'

const rootReducer = combineReducers({
  testReducer: testReducer
})

export default rootReducer