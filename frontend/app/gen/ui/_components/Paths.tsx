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
        const responses = await db.getAll("responses");
        if (responses[0].id) {
          const result: { data: { paths: OpenAPIFormat } } = await db.get(
            "responses",
            responses[0].id,
          );

          setResponse(Object.entries(result.data));
        }
      }
    }
    getResponses();
  }, [db]);
  console.log(response);

  return (
    <section className="flex flex-col items-center px-main">
      <h2>Paths</h2>
      <div className="flex flex-col gap-4 w-full items-center">
        {response.length ? (
          response.map((item, index) => (
            <PathItem
              key={index}
              path={item[0]}
              data={item[1] as ResponseMethodData}
            />
          ))
        ) : (
          <h3>Here empty</h3>
        )}
      </div>
    </section>
  );
}
