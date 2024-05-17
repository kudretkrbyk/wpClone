import React from "react";
import { useState } from "react";
import useStore from "../store/useStore.jsx";

export default function IdInput() {
  const itsMeId = useStore((state) => state.itsMeId);
  const setItsMeId = useStore((state) => state.setItsMeId);
  const [sendMessage, setSendMessage] = useState("");

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      setItsMeId(sendMessage);
    }
  };
  console.log("id giriş sayfası,", itsMeId);
  return (
    <div>
      <div className="w-full p-4 ">
        <input
          onChange={(e) => setSendMessage(e.target.value)}
          onKeyPress={handleEnterKeyPress}
          value={sendMessage}
          type="text"
          placeholder="id giriniz"
          className=" cursor-text  rounded-lg bg-white text-[#8796a1] text-sm font-light  px-4 py-2 w-full h-[35px] placeholder:p-4 "
        />
      </div>
    </div>
  );
}
