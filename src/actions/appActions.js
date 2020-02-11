export const testAction = (restaurant) => {
  return ({
    type: "ADD_RESTAURANT",
    payload: restaurant
  })
}

export const removeRestaurant = (id) => {
  return ({
    type: "REMOVE_RESTAURANT",
    payload: id
  })
}