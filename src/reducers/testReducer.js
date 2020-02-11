export default function testReducer(
  state = {
    count: 0
  },
  action
) {
  switch (action.type) {
    case "ADD_COUNT":
      console.log({ ...state, count: state.count + action.payload });
      return { ...state, count: state.count + action.payload };
    case "REMOVE_REVIEW":
      return state.filter(review => review.id !== action.payload);
    default:
      return state;
  }
}
