"use client";
import { dump } from "js-yaml";
import { useCode } from "@/lib/store/useCode";
import { json } from "@codemirror/lang-json";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useSettings } from "@/lib/store/useSettings";
import { yaml } from "@codemirror/lang-yaml";

export default function ResponseBlock() {
  const { response } = useCode();
  const { settings } = useSettings();
  const format =
    settings.responseFormat === 0
      ? JSON.stringify(response.data, null, 2)
      : dump(response.data, { indent: 2, lineWidth: -1 });
  return (
    <section className="w-full ">
      <ReactCodeMirror
        value={format}
        extensions={settings.responseFormat === 0 ? [json()] : [yaml()]}
        height="50vh"
        className="w-full text-lg"
        theme={"dark"}
      />
    </section>
  );
}
