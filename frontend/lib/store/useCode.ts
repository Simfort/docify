import { create } from "zustand";
import { UseCode } from "../types";

export const useCode = create<UseCode>((set) => ({
  code: "",
  response: {},
  file: null,
  setFile(file) {
    set({ file });
  },
  setCode: (code) => {
    set({ code });
  },
  setResponse: (response) => {
    set({ response });
  },
}));
