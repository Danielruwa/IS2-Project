import React from 'react';
import Paths from "./Routes";
import {NotificationContainer} from "react-notifications";

function App() {
  return (
    <div className="App">
      <NotificationContainer/>
      <Paths />
    </div>
  );
}

export default App;
