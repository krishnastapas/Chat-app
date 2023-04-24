// import { useState } from 'react'
import { useContext } from "react";
import { ChatContext } from "./feature/context/ChatContext";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";

function App() {
  const { currentAccount, user } = useContext(ChatContext);

  return (
    <>
      {currentAccount && user ? (
        <>
          <Home />
        </>
      ) : currentAccount ? (
        <Register />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
