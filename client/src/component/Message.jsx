import React, { useContext, useEffect, useState } from "react";
import "./Message.css";
import { ChatContext } from "../feature/context/ChatContext";

function Message({ message }) {
  const { currentAccount } = useContext(ChatContext);

  const [time, setTime] = useState();
  const [date, setDate] = useState();

  function ChangeHexadecimalTodecimal(num) {}

  function unixToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    console.log(day+"-" +month+"-" + year);
    setDate("   "+day+"-" +month+"-" + year);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  }

  const setTimeAndDate = () => {
    setTime(unixToTime(parseInt(message.time, 16)));
  };
  useEffect(() => {
    setTimeAndDate();
  }, []);
  return (
    <>
      {message ? (
        <div
          className={`chat_message ${
            message.sender.slice(-10).toLowerCase() ===
              currentAccount.slice(-10).toLowerCase() && "chat_receiver"
          }`}
        >
          <p>
            <span className="chat_name"></span>
            <spam dangerouslySetInnerHTML={{ __html: message.msg }}></spam>

            <span className="chat_timestamp">{date}</span>
            <span className="chat_timestamp">{time}</span>

          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;
