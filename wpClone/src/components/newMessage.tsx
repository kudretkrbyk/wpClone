//import React from "react";
import useStore from "../store/useStore.jsx";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { IoVideocam } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";

export default function NewMessage() {
  //global store persons tanımı
  const selectedPerson = useStore((state) => state.selectedPerson);
  //const setSelectedPerson = useStore((state) => state.setSelectedPerson);

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
