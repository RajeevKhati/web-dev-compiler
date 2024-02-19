import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
}

const initialState: LanguageState = {
  fullCode: {
    html: "This is html",
    css: "This is css",
    javascript: "This is javascript",
  },
  currentLanguage: "html",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage(
      state,
      action: PayloadAction<LanguageState["currentLanguage"]>
    ) {
      state.currentLanguage = action.payload;
    },
    updateCode(state, action: PayloadAction<string>) {
      state.fullCode[state.currentLanguage] = action.payload;
    },
  },
});

export const { changeLanguage, updateCode } = languageSlice.actions;
export default languageSlice.reducer;
