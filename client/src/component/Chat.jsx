import { Avatar, Button, IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "./Chat.css";
import { useState, useContext } from "react";
import { LoadingButton } from "@mui/lab";
import { ChatContext } from "../feature/context/ChatContext";
import Message from "./Message";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateMassageModal from "./ChatModal";
import LoadingPage from "../feature/loading/Loading";
import SendIcon from "@mui/icons-material/Send";
function Chat() {

  const [input, setInput] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [messagesList, setMessageList] = useState([]);


  const { currentFriend, sendMessage, readMessageFormContract } =
    useContext(ChatContext);

  const [showModal, setShowModal] = useState("");




  const readAllmessage = async () => {
    const data = await readMessageFormContract(currentFriend.pubkey);
    console.log(data)
    setMessageList(data);
  };



  const handleOnclickSendButton = async () => {
    setIsLoading(true);
    await sendMessage(currentFriend.pubkey, input);
    readAllmessage();
    setInput("")
    setIsLoading(false);
  };
  
  useEffect(() => {
    readAllmessage();
  }, [currentFriend]);
  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header_left">
          <div className="chat_header_avatar">
            <Avatar />
          </div>
          <div className="chat_header_name">
            <h3 style={{ margin: "0px" }}>{currentFriend.name}</h3>
            <p style={{ margin: "0px" }}>{currentFriend.pubkey}</p>
          </div>
        </div>
        <div className="chat_headerRight">
          <IconButton onClick={readAllmessage}>
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              margin: "5%",
            }}
            onClick={() => {
              setShowModal("add");
            }}
          >
            Message
          </Button>
        </div>
      </div>

      <div className="chat_body">
        {messagesList &&
          messagesList.length > 0 &&
          messagesList.map((message) => <Message message={message} isLoading={isLoading} onChangeLoading={(ele)=>setIsLoading(ele)} />)}
      </div>

      {showModal == "add" ? (
        <CreateMassageModal
          getAllList={readAllmessage}
          onClose={() => setShowModal("")}
        />
      ) : (
        ""
      )}
      <div className="chat_footer">
        <div className="chat_footer_input">
          <TextField
            fullWidth
            multiline
            placeholder="Enter your message............"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <IconButton onClick={handleOnclickSendButton}>
          <SendIcon color="success" />
        </IconButton>
      </div>
      {isLoading ? <LoadingPage /> : ""}
    </div>
  );
}

export default Chat;
