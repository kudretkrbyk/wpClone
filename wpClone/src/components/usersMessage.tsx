//import React from "react";
import useStore from "../store/useStore.jsx";

import { handleSendMessage } from "../functions/sendMessage.js";

//import { v4 as uuidv4 } from "uuid";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { IoVideocam } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function UserMessage({ socket }) {
  //const uniqueId = uuidv4();
  const [userMessages, setUserMessages] = useState("");

  const [sendMessage, setSendMessage] = useState("");
  //global store SelectedChat tanımı
  const selectedChat = useStore((state) => state.selectedChat);
  //Mesajı gönderen kişinin userId bilgisi
  const itsMeId = useStore((state) => state.itsMeId);
  //Seçilen Chat'in mesajları
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);

  useEffect(() => {
    socket.on("selectedChatMessages", (selectedChatData) => {
      setSelectedChatMessages(selectedChatData);
    });
  });

  useEffect(() => {
    console.log("usermessage selectedChatMessages", selectedChatMessages);
    if (selectedChatMessages) {
      const sortedMessages = selectedChatMessages.slice().sort((a, b) => {
        const dateA = new Date(a._Date);
        const dateB = new Date(b._Date);
        return dateA - dateB;
      });
      setUserMessages(sortedMessages);
    }
  }, [selectedChatMessages]);

  console.log("userChat sayfası *** gelen mesajlar:", userMessages);
  console.log(
    "user message sayfası selectedChatMessages",
    selectedChatMessages
  );

  console.log("1212userMessage içi selected message", selectedChat["userId"]);

  const handleEnterKeyPress = (event) => {
    const ChatId = userMessages[0].ChatId;
    const ReceiverId = selectedChat["userId"];
    if (event.key === "Enter" && !event.shiftKey) {
      const newMessage = handleSendMessage(
        sendMessage,
        itsMeId,
        ChatId,
        ReceiverId
      );
      console.log("geri geln mesaj", newMessage);
      if (newMessage) {
        console.log("if çalıtı users message");

        socket.emit("sendingMessage", newMessage);
      }
      setSendMessage("");
    }
  };

  return (
    <div className="w-full h-screen">
      {" "}
      <div className="   h-screen flex flex-col items-center justify-between w-full">
        <div className="flex items-center justify-between bg-gray-200 w-full h-20">
          <div className="flex p-4 items-center justify-center gap-4">
            <div className="">
              <img
                className="size-10 rounded-full object-cover"
                src={selectedChat.ProfilePhoto}
              ></img>
            </div>
            <div>{selectedChat.Name} </div>
          </div>

          <div className="flex items-center justify-center gap-6 p-2">
            <div>
              <button className="border-2">
                <IoVideocam className="size-5 text-gray-500" />
              </button>
            </div>
            <div>
              {" "}
              <button className="border-2">
                <LuSearch className="size-5 text-gray-500" />
              </button>
            </div>
            <div>
              {" "}
              <button className="border-2">
                <HiOutlineDotsVertical className="size-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="bg-[url(https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg)] 
              bg-center bg-cover sze w-full overflow-hidden overflow-y-scroll h-full"
        >
          <div className="">
            {userMessages &&
              userMessages.map((message, index) => (
                <div key={index}>
                  {message.SenderId === itsMeId ? (
                    <div id="sendingMessage" className="p-6 flex justify-end">
                      <div className="flex  gap-1 bg-white items-end justify-end shadow-xl rounded-xl rounded-tl-sm p-1">
                        <span className="p-2 text-black border-gray-200    dark:text-white">
                          {message.Content}
                        </span>
                        <span className="text-gray-500">
                          {new Date(message._Date).toLocaleTimeString("tr-TR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      id="incomingMessage"
                      className="flex justify-start p-6"
                    >
                      <div className="flex  gap-1 bg-white items-end justify-end shadow-xl rounded-xl rounded-tl-sm p-1">
                        <span className="p-2 text-black border-gray-200    dark:text-white">
                          {message.Content}
                        </span>
                        <span className="text-gray-500">
                          {new Date(message._Date).toLocaleTimeString("tr-TR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>{" "}
        <div className=" bg-gray-300 flex items-center justify-end gap-4 w-full p-4 h-20 ">
          <div>
            <FaRegSmile className="size-5 text-gray-500" />
          </div>
          <div>
            <FaPlus className="size-5 text-gray-500" />
          </div>
          <div className="w-full p-4 ">
            <input
              onChange={(e) => setSendMessage(e.target.value)}
              onKeyPress={handleEnterKeyPress}
              value={sendMessage}
              type="text"
              placeholder="Bir Mesaj Yazın"
              className=" cursor-text  rounded-lg bg-gray-200 text-black text-sm font-light  p-2 w-full h-[35px]  "
            />
          </div>
          <div>
            <FaMicrophone className="size-5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
