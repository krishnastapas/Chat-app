import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChatProvider } from "./feature/context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChatProvider>
);
