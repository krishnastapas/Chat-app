import "./Login.css";
import { ChatContext } from "../feature/context/ChatContext";
import { useContext, useState } from "react";
import { Avatar, IconButton, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Login() {
  const { connectWallet } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);

  const connectToWallet = async () => {
    setIsLoading(true);
    await connectWallet();
    setIsLoading(false);
  };
  return (
    <div className="login">
      <div className="login_container">
        {/* <WhatsAppIcon/> */}
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <LoadingButton loading={isLoading} onClick={connectToWallet}>
          Connect
        </LoadingButton>
      </div>
    </div>
  );
}

export default Login;
