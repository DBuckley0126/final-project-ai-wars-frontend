const initialState = {
  auth0Client: null,
  isLoading: true,
  isAuthenticated: false,
  user: null,
  loginWithRedirect: null,
  getTokenSilently: null,
  getIdTokenClaims: null,
  logout: null,
  attemptingSync: false,
  synced: false
};

export default function auth0Reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_AUTH0":
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
