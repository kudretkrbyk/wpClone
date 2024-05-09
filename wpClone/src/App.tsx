import Navbar from "./components/navbar";
import Chats from "./components/chats";
import ChatZone from "./components/chatZone";

function App() {
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
