import create from "zustand";

// Global store'u oluşturun
const useStore = create((set) => ({
  selectedPerson: null,
  setSelectedPerson: (person) => set({ selectedPerson: person }),
  selectedChat: null,
  setSelectedChat: (person) => set({ selectedChat: person }),
  itsMeId: localStorage.getItem("itsMeId")
    ? parseInt(localStorage.getItem("itsMeId"), 10)
    : null,

  setItsMeId: (senderId) =>
    set(() => {
      localStorage.setItem("itsMeId", senderId);
      return { itsMeId: senderId };
    }),

  sendingMessage: "",
  setSendingMessage: (newMessage) => set({ sendingMessage: newMessage }),
  selectedChatMessages: "",
  setSelectedChatMessages: (messages) =>
    set({ selectedChatMessages: messages }),
  deleteChatId: null,
  setDeleteChatId: (ChatId) => set({ deleteChatId: ChatId }),
  chatZoneControl: "0",
  setChatZoneControl: (control) => set({ chatZoneControl: control }),
  newMessageChatId: "",
  setNewMessageChatId: (ChatId) => set({ newMessageChatId: ChatId }),
  socketFilteredMessages: "",
  setSocketFilteredMessages: (allChatsData) =>
    set({ socketFilteredMessages: allChatsData }),
}));

export default useStore;
