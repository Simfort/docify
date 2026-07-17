import { create } from "zustand";
import { UseSettings } from "../types";

export const useSettings = create<UseSettings>((set) => ({
  settings: { mode: 0, root: "app", responseFormat: 0, ai: false },

  setSettings(settings) {
    set((state) => ({ settings: { ...state.settings, ...settings } }));
  },
}));
