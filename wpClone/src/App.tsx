import { useEffect } from "react";
import { io } from "socket.io-client";

import Navbar from "./components/navbar";
import Chats from "./components/chats";
import ChatZone from "./components/chatZone";

const SERVER_URL = "http://localhost:3001";

function App() {
  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on("connect", () => {
      console.log("socket ile bağlantı kuruldu");
    });

    // Socket.IO işlemlerini burada gerçekleştirin

    return () => {
      socket.disconnect(); // Komponent temizlendiğinde soketi kapat
    };
  }, []);

  return (
    <>
      <div className="w-full flex items-start justify-start  h-screen overflow-hidden">
        <Navbar></Navbar>
        <Chats></Chats>
        <ChatZone></ChatZone>
      </div>
    </>
  );
}

export default App;
