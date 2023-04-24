import { useContext } from "react";
import "./Home.css";
import Sidebar from "./Sidebar.jsx";
import { ChatContext } from "../feature/context/ChatContext";
import Chat from "./Chat";

function Home() {
  const { currentFriend, messageList } = useContext(ChatContext);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        {currentFriend ? <Chat currentFriend={currentFriend} messages={messageList} /> : " "}
      </div>
    </div>
  );
}

export default Home;
