export const updateCurrentHighlightedCoordinate = payload => {
  return {
    type: "UPDATE_CURRENT_HIGHLIGHTED_COORDINATE",
    payload: payload
  };
};

export const addCoordinate = payload => {
  return {
    type: "ADD_COORDINATE",
    payload: payload
  };
};

export const removeCoordinate = payload => {
  return {
    type: "REMOVE_COORDINATE",
    payload: payload
  };
};

