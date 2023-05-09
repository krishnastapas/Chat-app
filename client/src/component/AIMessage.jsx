import React, { useContext, useEffect, useState } from "react";
import "./Message.css";
import { ChatContext } from "../feature/context/ChatContext";

function AIMessage({ message }) {
  useEffect(() => {
   
  }, []);
  return (
    <>
      {message ? (
        <div className={message.role=="user"?"chat_message_receive" :"chat_message"}>
          <span className="chat_name"></span>
          <div dangerouslySetInnerHTML={{ __html: message.content }}></div>

          <span className="chat_timestamp">{}</span>
          <span className="chat_timestamp">{}</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default AIMessage;
