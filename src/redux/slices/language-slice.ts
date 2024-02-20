import { CSS, HTML, JAVASCRIPT } from "@/utils/language-initial-state";
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

export const initialLanguageState: LanguageState = {
  fullCode: {
    html: HTML,
    css: CSS,
    javascript: JAVASCRIPT,
  },
  currentLanguage: "html",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialLanguageState,
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
    updateFullCode(state, action: PayloadAction<LanguageState["fullCode"]>) {
      state.fullCode = action.payload;
    },
  },
});

export const { changeLanguage, updateCode, updateFullCode } =
  languageSlice.actions;
export default languageSlice.reducer;
