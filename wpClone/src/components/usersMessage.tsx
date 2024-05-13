//import React from "react";
import useStore from "../store/useStore.jsx";

import { v4 as uuidv4 } from "uuid";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { IoVideocam } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { useState } from "react";

export default function UserMessage() {
  const uniqueId = uuidv4();

  const [sendMessage, setSendMessage] = useState("");
  //global store SelectedChat tanımı
  const selectedChat = useStore((state) => state.selectedChat);
  const itsMeId = useStore((state) => state.itsMeId);

  //global store SelectedChat tanımı
  const sendingMessage = useStore((state) => state.sendingMessage);
  const setSendingMessage = useStore((state) => state.setSendingMessage);
  //const setSelectedPerson = useStore((state) => state.setSelectedPerson);
  //console.log("users Message", selectedChat.Messages);

  console.log("göndermeye çalışılan mesaj ", sendingMessage);
  console.log("seçilen mesaj bilgileri", selectedChat);

  selectedChat.Messages.map((message, index) => {
    console.log(message); // Her bir mesajı konsol log'unda gösterir
    // Burada her bir mesaj için yapılacak işlemleri gerçekleştirebilirsiniz
  });
  console.log("benim id", itsMeId);

  const handleSendMessage = () => {
    if (sendMessage.trim() !== "") {
      const sender = "support";

      setSendingMessage({
        Content: sendMessage,
        _Date: "11.05.2024",
        MessageId: uniqueId,
        ChatId: selectedChat.Messages[0].ChatId,

        isRead: false,
        forwarded: false,
        ReceiverId: selectedChat.userId,
        SenderId: itsMeId,
      });

      setSendMessage("");
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
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
            {selectedChat.Messages.map((message, index) => (
              <div key={index}>
                {message.ReceiverId === selectedChat.UserId ? (
                  <div id="sendingMessage" className="p-6 flex justify-end">
                    <div className="flex  gap-1 bg-white items-end justify-end shadow-xl rounded-xl rounded-tl-sm p-1">
                      <span className="p-2 text-black border-gray-200    dark:text-white">
                        {message.Content}
                      </span>
                      <span className="text-gray-500">{message.dHour} </span>
                    </div>
                  </div>
                ) : (
                  <div id="incomingMessage" className="flex justify-start p-6">
                    <div className="flex  gap-1 bg-white items-end justify-end shadow-xl rounded-xl rounded-tl-sm p-1">
                      <span className="p-2 text-black border-gray-200    dark:text-white">
                        {message.Content}
                      </span>
                      <span className="text-gray-500">{message.dHour} </span>
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
              className=" cursor-text  rounded-lg bg-gray-200 text-[#8796a1] text-sm font-light  px-4 py-2 w-full h-[35px] placeholder:p-4 "
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