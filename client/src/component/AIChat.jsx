import { useEffect, useState } from "react";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import "./Chat.css";
import LoadingPage from "../feature/loading/Loading";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import { chatGPTAPI } from "./AIChatApi";
import AIMessage from "./AIMessage";

function AIChat() {
  const [messagesList, setMessagesList] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [input, setInput] = useState();

  const getMessageFromAi = async (messages) => {
    setIsLoading(true);
    messages.reverse()
    const data = await chatGPTAPI({ messageList: messages });
    if (data) {
      setMessagesList(data);
    }
    setIsLoading(false);
  };

  const handleOnclickSendButton = () => {
    let obj = { role: "user", content: input };
    setMessagesList([obj, ...messagesList]);
    getMessageFromAi([obj, ...messagesList]);
    setInput("");
  };

  useEffect(() => {}, []);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_header_left">
          <div className="chat_header_avatar">
            <Avatar />
          </div>
          <div className="chat_header_name">
            <h3 style={{ margin: "0px" }}> AI Chat Bot</h3>
            <p style={{ margin: "0px" }}></p>
          </div>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <RefreshIcon />
          </IconButton>
          {/* <Button
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
          </Button> */}
        </div>
      </div>

      <div className="chat_body">
        {messagesList &&
          messagesList.length > 0 &&
          messagesList.map((message, index) => (
            <AIMessage message={message} key={index} />
          ))}
      </div>

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
        <IconButton
          onClick={() => {
            handleOnclickSendButton();
          }}
        >
          <SendIcon color="success" />
        </IconButton>
      </div>
      {isLoading ? <LoadingPage /> : ""}
    </div>
  );
}

export default AIChat;
