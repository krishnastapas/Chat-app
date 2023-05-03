import { useContext, useState } from "react";
import "./Home.css";
import Sidebar from "./Sidebar.jsx";
import { ChatContext } from "../feature/context/ChatContext";
import Chat from "./Chat";
import {
  Card,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function Home() {
  const { currentFriend } = useContext(ChatContext);
  const matches = useMediaQuery("(max-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  return (
    // <div className="app">
    <Card
      style={{
        position: "absolute",
        height: matches ? "100vh" : "90vh",
        width: matches ? "100vw" : "80vw",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
      }}
      sx={{ boxShadow: 4 }}
    >
      {!matches ? (
        // desktop
        <Sidebar />
      ) : (
        // mobile
        <IconButton
          sx={{ margin: "3%", position: "absolute" }}
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {
        <SwipeableDrawer
          anchor={"left"}
          open={openDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Sidebar />
        </SwipeableDrawer>
      }
      {currentFriend ? <Chat /> : ""}
    </Card>
  );
}

export default Home;
