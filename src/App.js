import React from "react";
import useAuth0 from "./hooks/Auth0/useAuth0";
import Counter from "./components/Counter/Counter";
import Header from "./components/Header/Header";
import ActionCableButton from './components/ActionCableButton/ActionCableButton'

const App = () => {
  useAuth0();

  return (
    <>
      <Header />
      <Counter />
      <ActionCableButton />
    </>
  );
};

export default App;
