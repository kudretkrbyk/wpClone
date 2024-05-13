import create from "zustand";

// Global store'u oluşturun
const useStore = create((set) => ({
  selectedPerson: null,
  setSelectedPerson: (person) => set({ selectedPerson: person }),
  selectedChat: null,
  setSelectedChat: (person) => set({ selectedChat: person }),
  itsMeId: "11",

  sendingMessage: null,
  setSendingMessage: (newMessage) => set({ sendingMessage: newMessage }),
}));

export default useStore;
