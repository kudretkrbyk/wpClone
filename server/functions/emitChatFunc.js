// emitChatFunc.js

const getOneUserMessages = require("../requests/getOneUserMessages");
const emitSelectedChatMessages = async (socket, ChatId) => {
  await getOneUserMessages((receivedChat) => {
    const selectedChatData = receivedChat;
    socket.emit("selectedChatMessages", selectedChatData);
    console.log("selectedChatMessages emit", selectedChatData);
  }, ChatId);
};

module.exports = emitSelectedChatMessages;
