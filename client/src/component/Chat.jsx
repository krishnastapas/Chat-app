import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import "./Chat.css";
import { useState, useContext } from "react";
import { LoadingButton } from "@mui/lab";
import { ChatContext } from "../feature/context/ChatContext";
import Message from "./Message";
import RefreshIcon from "@mui/icons-material/Refresh";

function Chat() {
  const [input, setInput] = useState();
  const [loading, setLoading] = useState(false);
  const [messagesList, setMessageList] = useState([]);
  const { currentFriend, sendMessage,readMessageFormContract } = useContext(ChatContext);

  const handleOnclickSendButton = async () => {
    setLoading(true);

    await sendMessage(currentFriend.pubkey, input);

    setInput("");
    setLoading(false);
  };

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
      </div>

      <div className="chat_body">
        {messagesList &&
          messagesList.length > 0 &&
          messagesList.map((message) => <Message message={message} />)}
      </div>

      <div className="chat_footer">
        {/* <InsertEmoticon /> */}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <LoadingButton
            style={{ marginLeft: "2%" }}
            variant="contained"
            color="success"
            type="submit"
            size="small"
            onClick={handleOnclickSendButton}
            loading={loading}
          >
            send
          </LoadingButton>
        </form>
        {/* <Mic /> */}
      </div>
    </div>
  );
}

export default Chat;
