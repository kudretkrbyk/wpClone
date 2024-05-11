import { useEffect, useState } from "react";
import useStore from "../store/useStore.jsx";

import { MdOutlineFilterList } from "react-icons/md";
//import { RiGroupLine } from "react-icons/ri";
import { HiMiniArrowLeft } from "react-icons/hi2";

export default function Persons({ persons, newChat, handleNewChat }: any) {
  //global store tanımı
  const selectedPerson = useStore((state) => state.selectedPerson);
  const setSelectedPerson = useStore((state) => state.setSelectedPerson);
  // Seçili kişiyi ayarlamak için setSelectedPerson fonksiyonunu kullanabilirsiniz
  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    console.log("selectedperson", selectedPerson);
  };
  console.log("selectedperson", selectedPerson);
  // İsimlere göre sıralama
  persons.sort((a, b) => a.Name.localeCompare(b.Name));

  // Harf bölümlerini içerecek bir nesne oluşturma
  const groupedPersons: { [key: string]: any[] } = {};

  // İsimlerin baş harflerine göre gruplama
  persons.forEach((person) => {
    const firstLetter = person.Name.charAt(0).toUpperCase();
    if (!groupedPersons[firstLetter]) {
      groupedPersons[firstLetter] = [];
    }
    groupedPersons[firstLetter].push(person);
  });

  // Diziyi oluşturma
  const groupedPersonsArray = Object.entries(groupedPersons);

  // Sonuçları konsola yazdırma

  const [width, setWidth] = useState();
  console.log("newchat", newChat);
  useEffect(() => {
    if (newChat) {
      setWidth("0px");
    } else {
      setWidth("500px");
    }
  }, [newChat]);

  console.log("w:", width);
  return (
    <div
      className={`absolute  w-${width} h-screen bg-white top-0 left-16 duration-300  ${
        width === "0px" ? "hidden" : "inline"
      } `}
      style={{ width: width }} // Burada genişlik durumunu stil olarak ayarlayın
    >
      <div
        className={`"  flex flex-col items-center justify-center gap-3 h-screen  transition-width duration-500 ease-in-out "`}
      >
        <div className="bg-white flex flex-col items-center justify-center w-full px-3 py-2  ">
          <div className="flex  items-center justify-start gap-2 w-full ">
            <div className="font-bold text-xl ">
              <i onClick={handleNewChat} className=" text-gray-400 size-8">
                <HiMiniArrowLeft />
              </i>
            </div>
            <div className="font-bold text-xl ">Yeni Sohbet</div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-full p-3 ">
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Ara"
                  className=" cursor-text  rounded-lg bg-gray-200 text-[#8796a1] text-sm font-light  px-4 py-2 w-[400px] h-[35px] placeholder:p-4 "
                />
                <HiMiniArrowLeft
                  onClick={handleNewChat}
                  className="absolute text-green-400 p-2 size-8 left-0 bottom-0"
                />
              </div>
            </div>
            <div>
              <i>
                <MdOutlineFilterList className="text-gray-400 size-8" />
              </i>
            </div>
          </div>{" "}
        </div>
        <div className="flex flex-col w-full h-full overflow-y-scroll ">
          <div className="">
            <div className="flex items-center justify-start gap-4 p-4">
              {" "}
              <div className="font-bold text-xl  rounded-full  bg-green-500 w-12 h-12 flex items-center justify-center">
                <i onClick={handleNewChat} className=" text-white  ">
                  <HiMiniArrowLeft />
                </i>
              </div>
              <div className="border-b py-4  w-full">yeni grup</div>
            </div>

            <div className="flex items-center justify-start gap-4 p-4 ">
              {" "}
              <div className="font-bold text-xl  rounded-full  bg-green-500 w-12 h-12 flex items-center justify-center">
                <i onClick={handleNewChat} className=" text-white  ">
                  <HiMiniArrowLeft />
                </i>
              </div>
              <div className="border-b py-4 w-full">yeni grup</div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 p-4">
            {" "}
            <div className="border-b py-4 w-full   text-green-500 font-bold text-xl">
              WHATSAPP'DAKİ KİŞİLER
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full gap-2">
            {groupedPersonsArray.length > 0 &&
              groupedPersonsArray.map((group, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-center w-full p-4"
                >
                  <div className="flex  items-end justify-center gap-12 w-full">
                    {group[0]}
                    <div className="border-b w-full "></div>
                  </div>{" "}
                  {/* Grup başlığı */}
                  {group[1].map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-3 w-full p-2"
                      onClick={() => handleSelectPerson(person)}
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
