import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "./components/navbar";
import Chats from "./components/chats";
import ChatZone from "./components/chatZone";
import Persons from "./components/persons";
import IdInput from "./components/idİnput.js";
import useStore from "./store/useStore.jsx";

const SERVER_URL = "http://localhost:3001";

function App() {
  const [newChat, setNewChat] = useState(true);
  const handleNewChat = () => {
    setNewChat(!newChat);
  };
  const itsMeId = useStore((state) => state.itsMeId);

  const socket = io(SERVER_URL);
  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on("connect", () => {
      console.log("socket ile bağlantı kuruldu");
    });
    socket.emit("joinRoom", itsMeId);
    if (itsMeId) {
      socket.emit("senderId", itsMeId);
    }

    return () => {
      socket.disconnect(); // Komponent temizlendiğinde soketi kapat
    };
  }, [socket]);

  return (
    <>
      {!itsMeId && <IdInput></IdInput>}

      <div className="w-full flex items-start justify-start  h-screen overflow-hidden">
        <Navbar></Navbar>
        <div>
          {" "}
          <Chats socket={socket} handleNewChat={handleNewChat}></Chats>
          <Persons
            newChat={newChat}
            handleNewChat={handleNewChat}
            socket={socket}
          ></Persons>
        </div>

        <ChatZone socket={socket}></ChatZone>
      </div>
    </>
  );
}

export default App;
