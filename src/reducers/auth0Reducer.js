const initialState = {
  auth0Client: null,
  JWT: null,
  isLoading: true,
  isAuthenticated: false,
  user: null,
  loginWithRedirect: null,
  getTokenSilently: null,
  getIdTokenClaims: null,
  logout: null,
  synced: null,
  persisted: null,
  apiToken: null
};

export default function auth0Reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_AUTH0":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
