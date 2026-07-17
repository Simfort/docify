"use client";
import { useMutation } from "@tanstack/react-query";
import CodeBlock from "./CodeBlock";
import ResponseBlock from "./ResponseBlock";
import { convertCode } from "@/lib/actions/convertCode";
import { useCode } from "@/lib/store/useCode";
import { useSettings } from "@/lib/store/useSettings";
import { Loader } from "lucide-react";

export default function CodeContainer() {
  const { code, setResponse, file } = useCode();
  const { settings } = useSettings();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: convertCode,
    mutationKey: ["convert-code"],
    onSuccess: (data) => {
      setResponse(data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.repeat) return;
    if (e.ctrlKey && e.code === "KeyS") {
      e.preventDefault();
      if (code || file)
        await mutateAsync({
          code,
          mode: settings.mode,
          file: file as File | undefined,
        });
      return;
    }
  };
  const handleClick = async () => {
    if (code || file)
      await mutateAsync({
        code,
        mode: settings.mode,
        ai: settings.ai,
        file: file as File | undefined,
      });
  };
  return (
    <section
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="flex gap-5 items-center">
      <CodeBlock />
      <div className="flex flex-col">
        <button onClick={handleClick} className="bg-accent p-2 rounded-lg ">
          Convert
        </button>{" "}
        <button className="text-accent p-2 ml-auto w-max">UI Docify</button>
      </div>

      {isPending ? (
        <div className="h-[50vh] w-full gap-2 flex items-center justify-center">
          <h4>Loading OpenAPI</h4>
          <Loader className="animate-spin" />{" "}
        </div>
      ) : (
        <ResponseBlock />
      )}
    </section>
  );
}
