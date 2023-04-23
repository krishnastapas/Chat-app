import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import "./Chat.css"
import { useState, useContext } from 'react';
import userContext from '../stateProviderContext/userContext.jsx';
import axios from '../axiosApiCall/axios'
import Message from './Message';



function Chat({messages}) {
    const [input, setInput] = useState("");
    const user = useContext(userContext)
    console.log("messages...\n ")
    console.log(messages)
    // console.log("messages.mesages ....\n")
    // console.log(messages.messages)
    const sendMessage = async (e) => {
        e.preventDefault();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log("You typed: ", input);

        axios.defaults.withCredentials = true;
        const res_user = await axios.post('/api/v1/chat/messages/new', {
            "chatId": user.chat.chatId,
            "message": input,
            "time": dateTime,
            headers: {
                withCredentials: true,

            },
        });
        console.log(res_user)

        setInput("")
    }
    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={user.chat.chatPhoto} />
                <div className="chat_headerInfo">
                    <h3>{user.chat.name}</h3>
                    {/* <p>last seen at....</p> */}
                    <p>{user.chat.email}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton />
                    <SearchOutlined />
                    <IconButton />
                    <IconButton />
                    <AttachFile />
                    <IconButton />
                    <IconButton />
                    <MoreVert />
                    <IconButton />
                </div>
            </div>

            <div className="chat_body">
                {messages ? (messages.map((message) => (
                    <Message  message={message} />
                ))
                ) : ""
                }
                <Message />
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Type a message' />
                    <button onClick={sendMessage} type="submit">send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat