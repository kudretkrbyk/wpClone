import useStore from "../store/useStore.jsx";
import ChatZoneMain from "./chatZoneMain.js";
import NewMessage from "./newMessage.js";
import UserMessage from "./usersMessage.js";

export default function ChatZone() {
  const selectedChat = useStore((state) => state.selectedChat);
  //const setSelectedChat = useStore((state) => state.setSelectedChat);
  const selectedPerson = useStore((state) => state.selectedPerson);
  console.log("chat sayfası selectedperson", selectedPerson);

  return (
    <div className="w-full h-screen">
      {selectedPerson ? (
        <NewMessage></NewMessage>
      ) : selectedChat ? (
        <UserMessage></UserMessage>
      ) : (
        <ChatZoneMain></ChatZoneMain>
      )}
    </div>
  );
}
