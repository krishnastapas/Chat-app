import "./Login.css";
import { ChatContext } from "../feature/context/ChatContext";
import { useContext } from "react";

function Login() {
  const { connectWallet } = useContext(ChatContext);
  return (
    <div className="login">
      <div className="login_container">
        {/* <WhatsAppIcon/> */}
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
      
        <button onClick={connectWallet}>Connect</button>
      </div>
    </div>
  );
}

export default Login;
