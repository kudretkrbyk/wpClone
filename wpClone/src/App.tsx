import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "./components/navbar";
import Chats from "./components/chats";
import ChatZone from "./components/chatZone";
import Persons from "./components/persons";

const SERVER_URL = "http://localhost:3001";

function App() {
  const [persons, setPersons] = useState([]);

  const [newChat, setNewChat] = useState(true);
  const handleNewChat = () => {
    setNewChat(!newChat);
  };
  console.log("app ", newChat);
  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on("connect", () => {
      console.log("socket ile bağlantı kuruldu");
    });
    socket.on("initialData", (persons) => {
      setPersons(persons);
      console.log("appppp", persons);
    });

    // Socket.IO işlemlerini burada gerçekleştirin

    return () => {
      socket.disconnect(); // Komponent temizlendiğinde soketi kapat
    };
  }, []);
  console.log("app", persons);

  return (
    <>
      {" "}
      <div className="w-full flex items-start justify-start  h-screen overflow-hidden">
        <Navbar></Navbar>
        <div>
          {" "}
          <Chats personss={persons} handleNewChat={handleNewChat}>
            {" "}
          </Chats>
          <Persons
            persons={persons}
            newChat={newChat}
            handleNewChat={handleNewChat}
          ></Persons>
        </div>

        <ChatZone></ChatZone>
      </div>
    </>
  );
}

export default App;
