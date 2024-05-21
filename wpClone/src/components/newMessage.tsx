//import React from "react";
import useStore from "../store/useStore.jsx";
import { handleSendMessage } from "../functions/sendMessage.js";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { IoVideocam } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { useState } from "react";
import { useEffect } from "react";

export default function NewMessage({ socket }) {
  useEffect(() => {
    socket.emit("joinRoom", itsMeId);
  }, [socket]);
  //Seçilen Chat için global store
  //const selectedChatMessages = useStore((state) => state.selectedChatMessages);
  //Seçilen mesajı global store dan bileşene almak için
  const [userMessages, setUserMessages] = useState("");
  //global store persons tanımı
  const selectedPerson = useStore((state) => state.selectedPerson);
  //const setSelectedPerson = useStore((state) => state.setSelectedPerson);

  const [sendMessage, setSendMessage] = useState("");
  //global store mesaj

  const itsMeId = useStore((state) => state.itsMeId);
  const currentDate = Date.now();
  //Newmessage fonk. için ChatId (ChatId=senderId+ReceiverId)
  //const setNewMessageChatId = useStore((state) => state.setNewMessageChatId);
  //const newMessageChatId = useStore((state) => state.newMessageChatId);
  const [ChatId, setChatId] = useState("");

  const [selectedChatMessages, setSelectedChatMessages] = useState([]);

  useEffect(() => {
    socket.on("newChatMessages", (selectedChatData) => {
      setSelectedChatMessages(selectedChatData);
      console.log("newmessageselectedChatData", selectedChatData);
    });
  }, [socket]);

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

  const handleSetChatId = () => {
    setChatId(currentDate);
  };

  const handleEnterKeyPress = (event) => {
    const ReceiverId = selectedPerson.userId;
    if (!ChatId) {
      handleSetChatId();
    }

    if (event.key === "Enter" && !event.shiftKey) {
      console.log("if içinde chatId", ChatId);
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
      <div className="   h-screen flex flex-col items-center justify-between">
        <div className="flex items-center justify-between bg-gray-200 w-full h-20">
          <div className="flex p-4 items-center justify-center gap-4">
            <div className="">
              <img
                className="size-10 rounded-full object-cover"
                src={selectedPerson.ProfilePhoto}
              ></img>
            </div>
            <div>{selectedPerson.Name} </div>
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
          <div className="flex flex-col gap-4 p-4 items-center justify-end w-full h-full text-gray-500">
            <div className=" bg-white rounded-lg shadow-sm w-20 p-1 px-2">
              BUGÜN
            </div>
            <div className="flex  justify-center gap-1 bg-lime-100 rounded-lg p-4 ">
              <div className="py-2 ">
                <i>
                  <GrSecure />
                </i>{" "}
              </div>
              <div className=" text-center ">
                <span>
                  Mesajlar uçtan uca şifrelidir. WhatsApp da dahil olmak üzere
                  bu sohbetin dışında bulunan hiç kimse mesajlarınızı okuyamaz
                  ve dinleyemez. Daha fazla bilgi edinmek için tıklayın
                </span>
              </div>
            </div>{" "}
            <div className="flex flex-col  w-full">
              {userMessages &&
                userMessages.map((message, index) => (
                  <div key={index}>
                    {message.SenderId === itsMeId ? (
                      <div
                        id="sendingMessage"
                        className="p-6 flex justify-end items-end gap-10"
                      >
                        <div className="flex  gap-1 bg-white items-end justify-end shadow-xl rounded-xl rounded-tl-sm p-1">
                          <span className="p-2 text-black border-gray-200    dark:text-white">
                            {message.Content}
                          </span>
                          <span className="text-gray-500">
                            {new Date(message._Date).toLocaleTimeString(
                              "tr-TR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        id="incomingMessage"
                        className="flex justify-start p-6"
                      >
                        <div className="flex w-full  gap-1 bg-white items-end justify-end shadow-xl rounded-xl rounded-tl-sm p-1">
                          <span className="p-2 text-black border-gray-200    dark:text-white">
                            {message.Content}
                          </span>
                          <span className="text-gray-500">
                            {message.dHour}{" "}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className=" bg-gray-200 flex items-center justify-center gap-4 w-full p-4 h-16">
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
              className=" cursor-text  rounded-lg bg-white text-[#8796a1] text-sm font-light  px-4 py-2 w-full h-[35px] placeholder:p-4 "
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
