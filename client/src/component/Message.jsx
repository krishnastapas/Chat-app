import React from 'react'
import userContext from '../stateProviderContext/userContext.jsx';
import { useContext} from 'react';
import "./Message.css"

function Message({message}) {
  const user = useContext(userContext)
  // console.log(key)
  console.log("Message.........")
  console.log(message)
  return (
    <>
    {message?(
     <div className={`chat_message ${(message.email === user.state.email) && 'chat_receiver'}`}>

      <p>
        <span className="chat_name">{message.name}</span>
        {message.message}
        <span className="chat_timestamp">{message.time}</span>
      </p>
    </div> 
    ):""}
    </>

  )
}

export default Message
