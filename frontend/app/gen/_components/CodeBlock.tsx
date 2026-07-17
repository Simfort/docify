"use client";
import { useCode } from "@/lib/store/useCode";
import { useSettings } from "@/lib/store/useSettings";
import { javascript } from "@codemirror/lang-javascript";
import ReactCodeMirror from "@uiw/react-codemirror";
import FilesPick from "./FilesPick";

export default function CodeBlock() {
  const { setCode, code } = useCode();
  const { settings } = useSettings();
  return (
    <section className="w-full ">
      {!settings.mode ? (
        <ReactCodeMirror
          key={0}
          value={code}
          onChange={(newCode) => setCode(newCode)}
          extensions={[javascript({})]}
          height="50vh"
          className="w-full text-lg"
          theme={"dark"}
        />
      ) : settings.mode === 1 ? (
        <FilesPick />
      ) : (
        <div>Error</div>
      )}
    </section>
  );
}
