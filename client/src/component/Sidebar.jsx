import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { ChatContext } from "../feature/context/ChatContext";
import AllUserModal from "./AllUserList";
import { Avatar, IconButton, Button } from "@mui/material";
import SidebarChat from "./SidebarChat";
// import { useStateValue } from '../stateProviderContext/StateProvider';
// import { actionTypes } from '../stateProviderContext/reducer';

function Sidebar() {
  const { friendList, user } = useContext(ChatContext);

  const [popUpMenu, setPopUpMenu] = React.useState(false);

  

  const [showModal, setShowModal] = useState("");
  const handleModal = (str) => {
    setShowModal(str);
  };

  // console.log(chats);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          {/* <Avatar /> */}
          <span>{user}</span>
          <div className="sidebar_headerRight">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowModal("alluser");
              }}
            >
              Friend +
            </Button>
            <div onClick={() => setPopUpMenu(!popUpMenu)}>
              <IconButton>{/* <MoreVert /> */}</IconButton>
            </div>
          </div>
          {popUpMenu && PopUpMenu()}
        </div>
        <div className="sidebar_search">
          <div className="sidebar_searchContainer">
            {/* <SearchOutlined /> */}
            <input placeholder="Search or Satart a new chat" type="text" />
          </div>
        </div>

        <div className="sidebar_chats">
          {/* <SidebarChat addNewChat /> */}

          {friendList && friendList.map((chat) => <SidebarChat chat={chat} />)}
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
