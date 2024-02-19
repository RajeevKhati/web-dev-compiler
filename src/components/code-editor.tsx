import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useCallback } from "react";
import { HelperHeader } from "./helper-header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCode } from "@/redux/slices/language-slice";

function CodeEditor() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const code = useAppSelector(
    (state) => state.language.fullCode[currentLanguage]
  );

  const onChange = useCallback(
    (code: string) => {
      dispatch(updateCode(code));
    },
    [dispatch]
  );

  return (
    <>
      <HelperHeader />
      <CodeMirror
        value={code}
        height="100vh"
        extensions={[loadLanguage(currentLanguage)!]}
        onChange={onChange}
        theme={draculaInit({
          settings: {
            caret: "#c6c6c6",
            fontFamily: "monospace",
          },
          styles: [{ tag: t.comment, color: "#6272a4" }],
        })}
      />
    </>
  );
}
export default CodeEditor;
