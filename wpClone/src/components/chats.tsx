import { MdOutlineFilterList } from "react-icons/md";
import { RiGroupLine } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";

export default function Chats() {
  return (
    <div className=" w-[500px]  h-screen">
      <div className="  flex flex-col items-center justify-center gap-3 h-screen  ">
        <div className="bg-white flex flex-col items-center justify-center w-full px-3 py-2  ">
          <div className="flex  items-center justify-between w-full ">
            <div className="font-bold text-xl ">Chats</div>
            <div className="flex items-center justify-center gap-4">
              <div>
                {" "}
                <i>
                  <RiGroupLine className=" text-gray-400 size-8" />
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
            <div className="flex flex-col items-center justify-between gap-3  w-full p-3  h-full ">
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start w-full gap-2 ">
                {" "}
                <img
                  className="p-2 rounded-full size-16 items-center object-cover"
                  src="https://media.istockphoto.com/id/1296158947/photo/portrait-of-creative-trendy-black-african-male-designer-laughing.jpg?s=612x612&w=0&k=20&c=1Ws_LSzWjYvegGxHYQkkgVytdpDcnmK0upJyGOzEPcg="
                ></img>
                <div className="flex flex-col items-start justify-center  w-full">
                  <div className="flex  items-start justify-between w-full">
                    {" "}
                    <div className="text-black ">kişi adı</div>
                    <div className="text-gray-300">13.00</div>{" "}
                  </div>

                  <div className="flex items-start justify-between w-full text-gray-300 border-b py-4   ">
                    <div>son gelen mesajlar burada yer ....</div> <div>dd</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
