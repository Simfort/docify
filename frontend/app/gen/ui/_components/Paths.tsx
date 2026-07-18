"use client";

import useIDB from "@/lib/hooks/useIDB";
import { OpenAPIFormat, ResponseMethodData } from "@/lib/types";
import { useEffect, useState } from "react";
import PathItem from "./PathItem";

export default function Paths() {
  const db = useIDB();
  const [response, setResponse] = useState<Array<[string, unknown]>>([]);

  useEffect(() => {
    async function getResponses() {
      if (db) {
        const result: { data: { paths: OpenAPIFormat } } = await db.get(
          "responses",
          1,
        );
        setResponse(Object.entries(result.data.paths));
      }
    }
    getResponses();
  }, [db]);
  console.log(response);
  return (
    <section className="flex flex-col items-center px-main">
      <h2>Paths</h2>
      <div className="flex flex-col gap-4 w-full items-center">
        {response.map((item, index) => (
          <PathItem
            key={index}
            path={item[0]}
            data={item[1] as ResponseMethodData}
          />
        ))}
      </div>
    </section>
  );
}
