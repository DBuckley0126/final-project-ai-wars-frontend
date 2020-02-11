export default function testReducer(state = [], action) {

  switch(action.type){
    case "ADD_REVIEW":
      // return (
      //   [...state, {...action.payload, id: cuid()}]
      // )
    case "REMOVE_REVIEW":
      // return (
      //   state.filter(review => review.id !== action.payload)
      // )  
    default :
      return state  
  }

}