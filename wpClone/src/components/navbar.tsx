import { RiGroupLine } from "react-icons/ri";
import { BsChatLeftText } from "react-icons/bs";
import { HiStatusOnline } from "react-icons/hi";
import { TbMessageCircle2 } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

export default function Navbar() {
  return (
    <div className="w-[60px] h-full z-50">
      {" "}
      <div className="  bg-gray-100   flex flex-col items-center justify-between gap-4 p-4 h-full ">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className=" hover:bg-slate-300 hover:rounded-full hover:p-2 p-2">
            {" "}
            <i>
              <BsChatLeftText className="size-8 text-gray-500" />
            </i>
          </div>

          <i>
            <RiGroupLine className="size-8  text-gray-500" />
          </i>
          <i>
            <HiStatusOnline className="size-8  text-gray-500" />
          </i>
          <i>
            <TbMessageCircle2 className="size-8  text-gray-500" />
          </i>

          <i>
            <div className="border-xl border-gray-500 border-b-2 w-12"></div>
          </i>
          <i>
            <FaRegStar className="size-8  text-gray-500" />
          </i>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          {" "}
          <i>
            <IoMdSettings className="size-8  text-gray-500" />
          </i>{" "}
          <div className="">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://i.insider.com/612f86d79ef1e50018f92070?width=700"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
