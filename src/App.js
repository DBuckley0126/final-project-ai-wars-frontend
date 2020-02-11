import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { testAction } from './actions/appActions'

 const App = () => {

  const result = useSelector( state => state)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
