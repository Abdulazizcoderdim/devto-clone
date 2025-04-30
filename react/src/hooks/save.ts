import { create } from "zustand";

interface Props {
  isSaved: boolean;
  toggle: () => void; // argument yo‘q
}

export const useSave = create<Props>((set) => ({
  isSaved: false,
  toggle: () => set((state) => ({ isSaved: !state.isSaved })),
}));
