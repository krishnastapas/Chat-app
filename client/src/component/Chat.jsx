import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import "./Chat.css";
import { useState, useContext } from "react";
import { LoadingButton } from "@mui/lab";
import { ChatContext } from "../feature/context/ChatContext";
import Message from "./Message";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateMassageModal from "./ChatModal";

function Chat() {
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);
  const [messagesList, setMessageList] = useState([]);
  const { currentFriend, sendMessage, readMessageFormContract } =
    useContext(ChatContext);
  const [showModal, setShowModal] = useState("");

 

  const readAllmessage = async () => {
    const data = await readMessageFormContract(currentFriend.pubkey);

    setMessageList(data);
  };
  useEffect(() => {
    readAllmessage();
  }, [currentFriend]);
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>{currentFriend.name}</h3>
          {/* <p>last seen at....</p> */}
          <p>{currentFriend.pubkey}</p>
        </div>
        <div className="chat_headerRight">
          <IconButton onClick={readAllmessage}>
            <RefreshIcon />
          </IconButton>
        </div>
        <Button
          variant="contained"
          sx={{
            height: "40px",
            margin: "5%",
          }}
          onClick={()=>{
            setShowModal("add")
          }}
        >
          Message
        </Button>
      </div>

      <div className="chat_body">
        {messagesList &&
          messagesList.length > 0 &&
          messagesList.map((message) => <Message message={message} />)}
          
      </div>

        {showModal=="add"?<CreateMassageModal getAllList={readAllmessage} onClose={()=>setShowModal("")}/>:""}
    
    </div>
  );
}

export default Chat;
