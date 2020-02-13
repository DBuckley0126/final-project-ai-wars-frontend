import { useDispatch } from "react-redux";
import ActionCable from "action-cable-react-jwt";
import { addCable } from "./useActionCableActions";

const useActionCable = apiToken => {
  const dispatch = useDispatch();
  dispatch(addCable(createActionCable(apiToken)));
};

const createActionCable = apiToken => {
  if (window.location.hostname === "localhost") {
    return ActionCable.createConsumer(`ws://localhost:3000/cable`, apiToken);
  } else {
    return ActionCable.createConsumer(
      `wss://javascript-project-gyro-back.herokuapp.com/cable`,
      apiToken
    );
  }
};

export default useActionCable;
