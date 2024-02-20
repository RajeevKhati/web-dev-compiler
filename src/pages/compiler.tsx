import CodeEditor from "@/components/code-editor";
import RenderCode from "@/components/render-code";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useAppDispatch } from "@/redux/hooks";
import {
  initialLanguageState,
  updateFullCode,
} from "@/redux/slices/language-slice";
import { ApiError, handleError } from "@/utils/handle-error";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Compiler() {
  const { urlId } = useParams();
  const dispatch = useAppDispatch();

  const loadCode = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:3000/compiler/load`, {
        urlId,
      });
      dispatch(updateFullCode(response.data.data));
    } catch (error) {
      handleError(error as ApiError);
    }
  }, [dispatch, urlId]);

  useEffect(() => {
    if (urlId) {
      loadCode();
    } else {
      dispatch(updateFullCode(initialLanguageState.fullCode));
    }
  }, [dispatch, loadCode, urlId]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100dvh-60px)] min-w-[350px]"
        defaultSize={50}
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
