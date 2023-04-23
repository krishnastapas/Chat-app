import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";


import "./SidebarChat.css";

function SidebarChat({ chat }) {


  return (
    <div  className="sidebarChat">
      <Avatar src={chat.chatPhoto} />
      <div className="sidebarchat_info">
        <h2>{chat.name}</h2>
        <p>last message.....</p>
      </div>
      <div className="moreVert" onClick={() => {}}>
        <IconButton>
          {/* <MoreVert /> */}
        </IconButton>
      </div>
     
    </div>
  );
}

export default SidebarChat;
