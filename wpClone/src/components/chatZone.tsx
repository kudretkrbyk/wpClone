import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";

import { IoVideocam } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";

export default function ChatZone() {
  return (
    <div className="w-[800px] h-screen">
      <div className="   h-screen flex flex-col items-center justify-between">
        <div className="flex items-center justify-between bg-gray-200 w-full h-20">
          <div className="flex p-4 items-center justify-center gap-4">
            <div className="">
              <img
                className="size-10 rounded-full object-cover"
                src="https://i.insider.com/612f86d79ef1e50018f92070?width=700"
              ></img>
            </div>
            <div> isim Soyisim</div>
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
          <div className="flex flex-col gap-24 p-4">
            <div>asdfsafafaf</div>
            <div>asdfsafafaf</div>
            <div>asdfsafafaf2</div>
            <div>asdfsafafaf2</div>
            <div>asdfsafafaf345</div>
            <div>asdfsafafaf6678</div>
            <div>asdfsafafaf7688</div>
            <div>asdfsafafaf</div>
            <div>9asdfsafafaf</div>
            <div>a9876sdfsafafaf</div>
            <div>asdfs45535432afafaf</div>
            <div>asdfsafafaqsdfs111f</div>
            <div>asdfsafa***???faf</div>
          </div>
        </div>
        <div className=" bg-gray-300 flex items-center justify-center gap-4 w-full p-4 h-20">
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
