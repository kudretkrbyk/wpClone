import { MdOutlineFilterList } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { TbMessagePlus } from "react-icons/tb";

export default function Chats({ personss, handleNewChat }: any) {
  console.log(personss);

  return (
    <div className=" w-[500px]  h-screen relative">
      <div className="  flex flex-col items-center justify-center gap-3 h-screen  ">
        <div className="bg-white flex flex-col items-center justify-center w-full px-3 py-2  ">
          <div className="flex  items-center justify-between w-full ">
            <div className="font-bold text-xl ">Chats</div>
            <div className="flex items-center justify-center gap-4">
              <div>
                {" "}
                <i>
                  <TbMessagePlus
                    onClick={handleNewChat}
                    className=" text-gray-400 size-8"
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
            <div className="w-full p-3 ">
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Ara"
                  className=" cursor-text  rounded-lg bg-gray-200 text-[#8796a1] text-sm font-light  px-4 py-2 w-[400px] h-[35px] placeholder:p-4 "
                />
                <LuSearch className="absolute text-green-400 p-2 size-8 left-0 bottom-0" />
              </div>
            </div>
            <div>
              <i>
                <MdOutlineFilterList className="text-gray-400 size-8" />
              </i>
            </div>
          </div>{" "}
        </div>
        <div className="flex flex-col w-full h-full overflow-y-scroll">
          <div className="flex   w-full h-full item-center justify-center">
            {" "}
            <div className="flex flex-col items-center justify-between gap-3 w-full p-3 h-full">
              {personss.map((person, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start w-full gap-2"
                >
                  <img
                    className="p-2 rounded-full size-16 items-center object-cover"
                    src={person.ProfilePhoto}
                    alt={person.Name}
                  />
                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-start justify-between w-full">
                      <div className="text-black">{person.Name}</div>
                      <div className="text-gray-500">13.00</div>
                    </div>
                    <div className="flex items-start justify-between w-full text-gray-500 border-b py-4">
                      <div>son gelen mesajlar burada yer ....</div>
                      <div>dd</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
