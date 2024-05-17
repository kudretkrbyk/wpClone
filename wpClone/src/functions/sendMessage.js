import { v4 as uuidv4 } from "uuid";

export const handleSendMessage = (
  sendMessage,

  itsMeId,
  ChatId,
  ReceiverId
) => {
  const currentDate = Date.now();
  console.log("date", currentDate);
  const MessageId = currentDate;
  console.log("dışarıdaki fonksiyon geldi");

  if (sendMessage.trim() !== "") {
    const message = {
      Content: sendMessage,
      _Date: currentDate,
      MessageId,
      ChatId,
      isRead: false,
      forwarded: false,
      ReceiverId: ReceiverId,
      SenderId: itsMeId,
    };
    console.log("fonksiyon içi mesaj", message);
    //setSendingMessage(message);
    return message; // Oluşturulan mesajı döndür
  }

  return null; // Eğer boş bir mesaj gönderilirse null döndür
};
