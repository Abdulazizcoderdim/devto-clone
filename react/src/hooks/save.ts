import { create } from "zustand";

interface Props {
  isSaved: boolean;
  toggle: (isSaved: boolean) => void;
}

export const useSave = create<Props>((set) => ({
  isSaved: false,
  toggle: () => set((state) => ({ isSaved: !state.isSaved })),
}));
