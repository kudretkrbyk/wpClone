import create from "zustand";

// Global store'u oluşturun
const useStore = create((set) => ({
  selectedPerson: null,
  setSelectedPerson: (person) => set({ selectedPerson: person }),
  selectedChat: null,
  setSelectedChat: (person) => set({ selectedChat: person }),
}));

export default useStore;
