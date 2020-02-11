export const addCount = (amount) => {
  return ({
    type: "ADD_COUNT",
    payload: amount
  })
}