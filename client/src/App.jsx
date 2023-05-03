// import { useState } from 'react'
import { useContext } from "react";
import { ChatContext } from "./feature/context/ChatContext";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import { Box } from "@mui/material";
import image from "./img1.jpg"

const style = {
  width: "100vw",
  height: "100vh",
  backgroundImage:"",
  backgroundImage: `url(${image})`,
};
function App() {
  const { currentAccount, user } = useContext(ChatContext);

  return (
    <Box sx={ style }>
      {currentAccount && user ? (
        <Home />
      ) : currentAccount ? (
        <Register />
      ) : (
        <Login />
      )}
    </Box>
  );
}

export default App;
