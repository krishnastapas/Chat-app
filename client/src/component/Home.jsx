import { useContext } from "react";
import "./Home.css";
import Sidebar from "./Sidebar.jsx";
import { ChatContext } from "../feature/context/ChatContext";
import Chat from "./Chat";

function Home() {
  
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat/> 
      </div>
    </div>
  );
}

export default Home;
