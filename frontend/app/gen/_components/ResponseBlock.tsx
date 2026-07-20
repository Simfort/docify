"use client";
import { dump } from "js-yaml";
import { useCode } from "@/lib/store/useCode";
import { json } from "@codemirror/lang-json";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useSettings } from "@/lib/store/useSettings";
import { yaml } from "@codemirror/lang-yaml";
import { Copy, CopyCheck, Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResponseBlock() {
  const { response } = useCode();
  const { settings } = useSettings();
  const [isCopied, setIsCopied] = useState(false);
  const format =
    settings.responseFormat === 0
      ? JSON.stringify(response.data, null, 2)
      : dump(response.data, { indent: 2, lineWidth: -1 });

  const handleCopy = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(format);
      setIsCopied(true);
    } else {
      alert("clipboard is not support you browser");
    }
  };

  function downloadFile() {
    const blob = new Blob([format], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      settings.responseFormat === 0
        ? `docifyOpenApi.json`
        : "docifyOpenApi.yaml";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isCopied]);
  return (
    <section className="w-full ">
      <div className="flex justify-between py-2">
        <h5>Response</h5>
        <div className="flex gap-5">
          <button
            onClick={handleCopy}
            className={`${isCopied ? "text-success border-success" : "text-secondary border-accent"} bg-card  text-sm items-center  border  rounded-sm flex gap-2 py-1 px-5`}>
            {isCopied ? (
              <>
                <CopyCheck />
                Copied
              </>
            ) : (
              <>
                <Copy />
                Copy
              </>
            )}
          </button>{" "}
          <button onClick={downloadFile} className="flex items-center gap-2">
            <Download />
            Download
          </button>
        </div>
      </div>

      <ReactCodeMirror
        value={format}
        extensions={settings.responseFormat === 0 ? [json()] : [yaml()]}
        height="50vh"
        readOnly
        className="w-full text-lg "
        theme={"dark"}
      />
    </section>
  );
}
