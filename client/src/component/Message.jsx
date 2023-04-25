import React, { useContext } from "react";
import "./Message.css";
import { ChatContext } from "../feature/context/ChatContext";

function Message({ message }) {
  const { currentAccount } = useContext(ChatContext);

  // console.log(key)
  console.log(currentAccount.slice(-10).l);
  console.log("Message.........");
  console.log(message.sender.slice(-10));
  return (
    <>
      {message ? (
        <div
          className={`chat_message ${
            message.sender.slice(-10).toLowerCase() === currentAccount.slice(-10).toLowerCase() && "chat_receiver"
          }`}
        >
          <p>
            <span className="chat_name"></span>
            {message.msg}
            <span className="chat_timestamp">{message.time}</span>
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;
