import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Navbar from "./components/navbar";
import Chats from "./components/chats";
import ChatZone from "./components/chatZone";
import Persons from "./components/persons";

const SERVER_URL = "http://localhost:3000";

function App() {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on("connect", () => {
      console.log("socket ile bağlantı kuruldu");
    });
    socket.on("initialData", (persons) => {
      setPersons(persons);
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
        <div>
          {" "}
          <Chats personss={persons}> </Chats>
          <Persons persons={persons}></Persons>
        </div>

        <ChatZone></ChatZone>
      </div>
    </>
  );
}

export default App;
