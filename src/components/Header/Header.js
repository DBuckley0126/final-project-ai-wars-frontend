import React from "react";
import { useSelector } from "react-redux";
import "./Header.scss";

export default function Header() {
  const { isLoading, user, loginWithRedirect, logout } = useSelector(
    state => state.auth0
  );
  console.log(user)

  return (
    <header>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-menu is-active">
            {/* logo */}
            <div className="navbar-brand">
              <button className="navbar-item">My Cool App!</button>
            </div>

            {/* menu items */}
            <div className="navbar-end">
              {/* if there is no user. show the login button */}
              {!isLoading && !user && (
                <button onClick={loginWithRedirect} className="navbar-item">
                  Login
                </button>
              )}

              {/* if there is a user. show user name and logout button */}
              {!isLoading && user && (
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
