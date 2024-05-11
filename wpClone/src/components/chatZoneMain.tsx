import { GrSecure } from "react-icons/gr";

export default function ChatZoneMain() {
  return (
    <div className="flex flex-col gap-10 items-center justify-end w-full h-full p-4">
      <div className="bg-[url(https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png)] bg-center bg-cover w-[320px] h-48">
        {" "}
      </div>
      <div className="text-3xl text-gray-500">
        Windows için WhatsApp'ı indirin{" "}
      </div>
      <div className="   text-center">
        Yeni Windows uygulamasını indirerek arama yapın, ekranınızı paylaşın ve
        daha hızlı bir <br></br> deneyim yaşayın{" "}
      </div>
      <div>
        <button className="bg-emerald-500 rounded-full px-4 p-2">
          Microsoft Store'dan indir
        </button>{" "}
      </div>
      <div className="mt-24 flex items-center justify-center gap-1 text-gray-500">
        <div>
          <i>
            <GrSecure />
          </i>{" "}
        </div>
        <div>Kişisel mesajlarınız uçtan uça şifrelidir </div>
      </div>{" "}
    </div>
  );
}
