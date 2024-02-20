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
    html: `<html lang="en">
    <body>
  
    </body>
</html>`,
    css: `body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
}
`,
    javascript: "//Write javascript here",
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
    updateFullCode(state, action: PayloadAction<LanguageState["fullCode"]>) {
      state.fullCode = action.payload;
    },
  },
});

export const { changeLanguage, updateCode, updateFullCode } =
  languageSlice.actions;
export default languageSlice.reducer;
