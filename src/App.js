import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { testAction } from './components/Counter/counterActions'
import { useAuth0 } from './contexts/auth0-context'
import Counter from './components/Counter/Counter';
import Header from './components/Header/Header'

const App = () => {
  const { isLoading, user, loginWithRedirect, logout } = useAuth0


  return (
    <>
      <Header />
      <Counter />
    </>
  )
}

export default App;
