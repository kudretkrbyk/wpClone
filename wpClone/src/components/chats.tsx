import { MdOutlineFilterList } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { TbMessagePlus } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import useStore from "../store/useStore.jsx";

export default function Chats({ allChats, handleNewChat }: any) {
  const selectedChat = useStore((state) => state.selectedChat);
  const setSelectedChat = useStore((state) => state.setSelectedChat);
  const handleSelectedChat = (person) => {
    setSelectedChat(person);
    console.log("selected messages", selectedChat);
  };

  const [messagesMenuControl, setMessagesMenuControl] = useState(false);
  const handleMessagesMenu = () => {
    setMessagesMenuControl(!messagesMenuControl);
  };
  return (
    <div className="w-[500px] h-screen relative">
      <div className="flex flex-col items-center justify-center gap-3 h-screen">
        <div className="bg-white flex flex-col items-center justify-center w-full px-3 py-2">
          <div className="flex items-center justify-between w-full">
            <div className="font-bold text-xl">Chats</div>
            <div className="flex items-center justify-center gap-4">
              <div>
                <i>
                  <TbMessagePlus
                    onClick={handleNewChat}
                    className="text-gray-400 size-8"
                  />
                </i>
              </div>
              <div>
                <i>
                  <HiOutlineDotsVertical className="text-gray-400 size-8" />
                </i>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-full p-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ara"
                  className="cursor-text rounded-lg bg-gray-200 text-[#8796a1] text-sm font-light px-4 py-2 w-[400px] h-[35px] placeholder:p-4"
                />
                <LuSearch className="absolute text-green-400 p-2 size-8 left-0 bottom-0" />
              </div>
            </div>
            <div>
              <i>
                <MdOutlineFilterList className="text-gray-400 size-8" />
              </i>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full h-full overflow-y-scroll">
          <div className="flex w-full h-full item-center justify-center">
            <div className="flex flex-col items-center justify-between gap-3 w-full p-3 h-full">
              {allChats.map((person, index) => {
                // Mesajları tarih ve saate göre ters sırala
                const sortedMessages = person.Messages.slice().sort((a, b) => {
                  // Tarih ve saat bilgisine göre sırala (daha yeni olan daha önce gelecek)
                  const dateA = new Date(a._Date + " " + a.dHour);
                  const dateB = new Date(b._Date + " " + b.dHour);
                  return dateB - dateA; // Ters sıralama için dateB - dateA
                });

                return (
                  <div
                    onClick={() => handleSelectedChat(person)}
                    key={index}
                    className="flex items-center justify-start w-full gap-2 p-2 hover:bg-gray-200 hover:cursor-pointer group"
                  >
                    <img
                      className="p-2 rounded-full size-16 items-center object-cover"
                      src={person.ProfilePhoto}
                      alt={person.Name}
                    />

                    <div className="flex flex-col items-start justify-center w-full">
                      <div className="flex items-start justify-between w-full">
                        <div className="text-gray-600">{person.Name}</div>
                        <div className="text-gray-500">
                          {sortedMessages[1]?._Date}
                          {console.log(
                            "0",
                            sortedMessages[0],
                            "1",
                            sortedMessages[1]
                          )}
                        </div>
                      </div>
                      <div className="flex items-start justify-between w-full text-gray-500 border-b py-4">
                        <div>{sortedMessages[1]?.Content}</div>
                        <div
                          className="flex relative"
                          onClick={handleMessagesMenu}
                        >
                          <i>
                            <IoIosArrowDown className="hidden group-hover:inline size-7" />
                          </i>
                          {messagesMenuControl ? (
                            <div className="absolute rounded-md p-4 -left-40 top-10 shadow-xl w-48 h-56 flex flex-col items-start justify-center gap-3 bg-white">
                              <div>Sohbeti arşivle</div>
                              <div>Bildirimleri Sessize al</div>
                              <div>Sohbeti sil</div>
                              <div>Sohbeti Sabitle</div>
                              <div>Okunmadı olarak işaretle</div>
                              <div>Engelle</div>
                            </div>
                          ) : (
                            <div className="hidden"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
