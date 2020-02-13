import React from "react";
import { useSelector } from "react-redux";
import "./Header.scss";

export default function Header() {
  console.log("Header Rendering");

  // const isLoading = useSelector(state => state.auth0.isLoading);
  const user = useSelector(state => state.auth0.user);
  const loginWithRedirect = useSelector(state => state.auth0.loginWithRedirect);
  const logout = useSelector(state => state.auth0.logout);

  return (
    <header>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-menu is-active">
            {/* logo */}

            {/* menu items */}
            <div className="navbar-end">
              {/* if there is no user. show the login button */}
              {!user && (
                <button onClick={loginWithRedirect} className="navbar-item">
                  Login
                </button>
              )}

              {/* if there is a user. show user name and logout button */}
              {user && (
                <>
                  <button className="navbar-item">{user.name}</button>
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="navbar-item"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
