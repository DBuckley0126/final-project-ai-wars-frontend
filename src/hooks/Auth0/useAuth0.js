import { useEffect } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import { useDispatch } from "react-redux";
import { updateAuth0, syncUser } from "./useAuth0Actions";

const useAuth0 = () => {
  const dispatch = useDispatch();
  let auth0Client = null;

  useEffect(() => {
    initializeAuth0();
  });

  let config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin
  };

  // initialize the auth0 library
  const initializeAuth0 = async () => {
    auth0Client = await createAuth0Client(config);
    dispatch(updateAuth0({ auth0Client }));

    // check to see if they have been redirected after login
    if (window.location.search.includes("code=")) {
      return handleRedirectCallback();
    }

    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    dispatch(
      updateAuth0({
        isLoading: false,
        isAuthenticated,
        user,
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        logout: (...p) => auth0Client.logout(...p)
      })
    );
    dispatch(syncUser({ ...user }));
  };

  // handle the authentication callback
  const handleRedirectCallback = async () => {
    dispatch(updateAuth0({ isLoading: true }));

    await auth0Client.handleRedirectCallback();

    const user = await auth0Client.getUser();

    dispatch(
      updateAuth0({
        user,
        isAuthenticated: true,
        isLoading: false,
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        logout: (...p) => auth0Client.logout(...p)
      })
    );
    dispatch(syncUser({ ...user }));

    window.history.replaceState({}, document.title, window.location.pathname);
  };
};

export default useAuth0;
