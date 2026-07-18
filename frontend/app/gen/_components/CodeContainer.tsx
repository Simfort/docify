"use client";
import { useMutation } from "@tanstack/react-query";
import CodeBlock from "./CodeBlock";
import ResponseBlock from "./ResponseBlock";
import { convertCode } from "@/lib/actions/convertCode";
import { useCode } from "@/lib/store/useCode";
import { useSettings } from "@/lib/store/useSettings";
import { Loader } from "lucide-react";
import useIDB from "@/lib/hooks/useIDB";
import Link from "next/link";

export default function CodeContainer() {
  const { code, setResponse, file } = useCode();
  const { settings } = useSettings();
  const db = useIDB();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: convertCode,
    mutationKey: ["convert-code"],
    onSuccess: async (data) => {
      if (db) {
        const responses = await db.getAll("responses");
        if (responses.length <= 0) await db?.add("responses", data);
        else {
          const finded = responses[0];
          console.log(finded);
          await db.put("responses", { ...data, id: finded.id });
        }
        setResponse(data);
      }
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
          ai: settings.ai,
          root: settings.root,
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
        root: settings.root,
        file: file as File | undefined,
      });
  };
  return (
    <section
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="flex gap-5 items-center max-lg:flex-col">
      <CodeBlock />
      <div className="flex flex-col">
        <button onClick={handleClick} className="bg-accent p-2 rounded-lg ">
          Convert
        </button>{" "}
        <Link
          href={"/gen/ui"}
          className="text-accent p-2 ml-auto w-max hover:opacity-60 active:opacity-50">
          UI Docify
        </Link>
      </div>

      {isPending ? (
        <div className="h-[50vh] w-full border border-dotted border-accent gap-2 flex items-center justify-center">
          <h4>Loading OpenAPI</h4>
          <Loader className="animate-spin" />{" "}
        </div>
      ) : (
        <ResponseBlock />
      )}
    </section>
  );
}
