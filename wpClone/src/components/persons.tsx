import React, { useState } from "react";

export default function Persons({ persons }) {
  // Örnek bir persons dizisi

  // İsimlere göre sıralama
  persons.sort((a, b) => a.Name.localeCompare(b.Name));

  // Harf bölümlerini içerecek bir nesne oluşturma
  const groupedPersons = {};

  // İsimlerin baş harflerine göre gruplama
  persons.forEach((person) => {
    const firstLetter = person.Name.charAt(0).toUpperCase();
    if (!groupedPersons[firstLetter]) {
      groupedPersons[firstLetter] = [];
    }
    groupedPersons[firstLetter].push(person);
  });

  // Sonuçları konsola yazdırma
  console.log(groupedPersons);

  const [control, setControl] = useState(true);
  const [width, setWidth] = useState("500px");

  const handleButtonClick = () => {
    setControl(!control);
    if (control) {
      setWidth("0px");
    } else {
      setWidth("500px");
    }
  };

  console.log("w:", width);
  return (
    <div
      className={`absolute  w-${width} h-screen bg-slate-800 top-0 left-16 duration-300`}
      style={{ width: width }} // Burada genişlik durumunu stil olarak ayarlayın
    >
      hey
      <button className="bg-gray-200 size-16 " onClick={handleButtonClick}>
        kjjh
      </button>
    </div>
  );
}
