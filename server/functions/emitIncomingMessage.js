const emitIncomingMessages = async (globalSocket, socketFilteredMessages) => {
  globalSocket.emit("allIncomingMessages", socketFilteredMessages);
  //console.log("all ıncoming messages emit oldu", socketFilteredMessages);
};

module.exports = emitIncomingMessages;
