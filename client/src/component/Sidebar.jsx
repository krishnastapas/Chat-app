import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { ChatContext } from "../feature/context/ChatContext";
import AllUserModal from "./AllUserList";
import { Avatar, IconButton, Button, Box, useMediaQuery } from "@mui/material";
import SidebarChat from "./SidebarChat";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import { useStateValue } from '../stateProviderContext/StateProvider';
// import { actionTypes } from '../stateProviderContext/reducer';

function Sidebar() {
  const { friendList, user, changeFriend } = useContext(ChatContext);

  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");

  const [showModal, setShowModal] = useState("");
  const handleModal = (str) => {
    setShowModal(str);
  };

  const hadleOnClick = async (chat) => {
    setLoading(true);
    console.log(chat);
    await changeFriend(chat);
    setLoading(false);
    // get the message list
  };
  // console.log(chats);
  return (
    <>
      <div
        style={{
          flex: matches ? "0.35" : "0.25",
          display: "flex",
          flexDirection: "column",
          minWidth: "300px",
        }}
      >
        <div className="sidebar_header">
          <Box className="sidebar_header_user">
            <Avatar />
            <h4>{user}</h4>
          </Box>
          <div className="sidebar_headerRight">
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                setShowModal("alluser");
              }}
            >
              <GroupAddIcon fontSize="large" />
            </IconButton>
            <div onClick={() => setPopUpMenu(!popUpMenu)}>
              <IconButton>{/* <MoreVert /> */}</IconButton>
            </div>
          </div>
          {/* {popUpMenu && PopUpMenu()} */}
        </div>


        <div className="sidebar_search">
          <div className="sidebar_searchContainer">
            {/* <SearchOutlined /> */}
            <input placeholder=" Search " type="text" />
          </div>
        </div>

        <div className="sidebar_chats">
          {/* <SidebarChat addNewChat /> */}

          {friendList &&
            friendList.map((chat, index) => (
              <Box
                key={index}
                onClick={() => {
                  console.log("Chat clicked : ", chat.name);
                  hadleOnClick(chat);
                }}
              >
                <SidebarChat chat={chat} />
                <SidebarChat chat={chat} />
                <SidebarChat chat={chat} />
                <SidebarChat chat={chat} />
                <SidebarChat chat={chat} />
              </Box>
            ))}
        </div>
      </div>

      {showModal == "alluser" && <AllUserModal handleModal={handleModal} />}
    </>
  );
}

export default Sidebar;

function PopUpMenu() {
  return (
    <ul className="drop-down">
      <li>
        <button>Logout</button>
        <button>Change Name</button>
      </li>
      {/* <li>Menu-item-2</li>
        <li>Menu-item-3</li> */}
    </ul>
  );
}
