import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "./Chat.css";
import { useState, useContext } from "react";
// import Message from "./Message";

function Chat({ currentFriend, messageList }) {
  const [input, setInput] = useState();
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
          {/* <IconButton />
          <SearchOutlined />
          <IconButton />
          <IconButton />
          <AttachFile />
          <IconButton />
          <IconButton />
          <MoreVert />
          <IconButton /> */}
        </div>
      </div>

      <div className="chat_body">
        {/* {messages ? (messages.map((message) => (
                    <Message  message={message} />
                ))
                ) : ""
                }
                <Message /> */}
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
          <button type="submit">send a message</button>
        </form>
        {/* <Mic /> */}
      </div>
    </div>
  );
}

export default Chat;
