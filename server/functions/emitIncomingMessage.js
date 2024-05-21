const emitIncomingMessages = async (io, socketFilteredMessages, receiverId) => {
  console.log("emit fonk reevirerID", receiverId);
  io.to(receiverId).emit("allIncomingMessages", socketFilteredMessages);
  // globalSocket.emit("allIncomingMessages", socketFilteredMessages);
  //console.log("all ıncoming messages emit oldu", socketFilteredMessages);
};

module.exports = emitIncomingMessages;
