import React, { useContext, useEffect, useState } from "react";
import "./Message.css";
import { ChatContext } from "../feature/context/ChatContext";

function Message({ message }) {
  const { currentAccount } = useContext(ChatContext);

  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [isReceiver, setIsReceiver] = useState(false);

  function unixToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    console.log(day + "-" + month + "-" + year);
    setDate("   " + day + "-" + month + "-" + year);
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
    if (
      message.sender.slice(-10).toLowerCase() ===
      currentAccount.slice(-10).toLowerCase()
    ) {
      setIsReceiver(true);
    }
  }, []);
  return (
    <>
      {message ? (
        <div className={isReceiver?"chat_message_receive" :"chat_message"}>
        
            <span className="chat_name"></span>
            <div dangerouslySetInnerHTML={{ __html: message.msg }}></div>

            <span className="chat_timestamp">{date}</span>
            <span className="chat_timestamp">{time}</span>
        
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Message;
