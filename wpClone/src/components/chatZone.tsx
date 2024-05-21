import useStore from "../store/useStore.jsx";
import ChatZoneMain from "./chatZoneMain.js";
import NewMessage from "./newMessage.js";
import UserMessage from "./usersMessage.js";
import { useEffect } from "react";

export default function ChatZone({ socket }) {
  const itsMeId = useStore((state) => state.itsMeId);
  useEffect(() => {
    socket.emit("joinRoom", itsMeId);
  }, [socket]);
  //const selectedChat = useStore((state) => state.selectedChat);
  //const setSelectedChat = useStore((state) => state.setSelectedChat);
  const selectedPerson = useStore((state) => state.selectedPerson);
  console.log("chat sayfası selectedperson", selectedPerson);

  //ChatZone Alanını kotrol etmek için kullanılan gloal store
  const chatZoneControl = useStore((state) => state.chatZoneControl);

  return (
    <div className="w-full h-screen">
      {chatZoneControl === "2" ? (
        <NewMessage socket={socket}></NewMessage>
      ) : chatZoneControl === "1" ? (
        <UserMessage socket={socket}></UserMessage>
      ) : (
        <ChatZoneMain></ChatZoneMain>
      )}
    </div>
  );
}
