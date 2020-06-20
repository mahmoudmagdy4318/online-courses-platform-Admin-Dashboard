import React from "react";
import "./App.css";
import Router from "./Routes/browserRouter";
import UserContext from "./context/userContext";

function App(props) {
  return (
    <UserContext>
      <Router />
    </UserContext>
  );
}

export default App;
