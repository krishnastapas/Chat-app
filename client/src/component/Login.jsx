import "./Login.css";
import { ChatContext } from "../feature/context/ChatContext";
import { useContext, useState } from "react";
import { Avatar, IconButton, Button, Card, Box, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Login() {
  const { connectWallet } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);
  const matches = useMediaQuery('(max-width:600px)');

  const connectToWallet = async () => {
    setIsLoading(true);
    await connectWallet();
    setIsLoading(false);
  };
  return (
    <Card
      style={{
        position: "absolute",
        width: matches?"90vw":"30vw",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // border: "2px solid #000",
      }}
      sx={{ boxShadow: 4 }}
    >
      <div style={{display:"flex",justifyContent:"center"}}>
        <h1>Sign In</h1>
      </div>

      {/*  button div */}
      <Box style={{display:"flex",justifyContent:"center",margin:"5%"}}>
        <LoadingButton
          variant="contained"
          color="success"
          loading={isLoading}
          onClick={connectToWallet}
        >
          Connect
        </LoadingButton>
      </Box>
    </Card>
  );
}

export default Login;
