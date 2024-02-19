import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useCallback, useState } from "react";
import { HelperHeader } from "./helper-header";

function CodeEditor() {
  const [value, setValue] = useState("console.log('hello world!');");

  const onChange = useCallback((val: string) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <>
      <HelperHeader />
      <CodeMirror
        value={value}
        height="100vh"
        extensions={[loadLanguage("javascript")!]}
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
