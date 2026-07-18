import { ResponseMethodData } from "@/lib/types";
import ResponseItem from "./ResponseItem";
import { useState } from "react";

export default function PathItem({
  path,
  data,
}: {
  path: string;
  data: ResponseMethodData;
}) {
  const [flag, setFlag] = useState(false);
  const method = Object.entries(data)[0][0];
  const responses = Object.entries(data[method].responses || []);

  return (
    <div className="border-accent border w-full max-w-4xl rounded-sm bg-accent/20 p-5">
      <button
        onClick={() => setFlag(!flag)}
        className="flex items-center gap-5">
        <h5 className="flex gap-5 items-center">
          {" "}
          <div className="bg-accent px-5 uppercase rounded-lg">{method}</div>
          {path}
        </h5>
        <p className="text-secondary">
          {data[method].summary || "Summary is empty"}
        </p>
      </button>
      {flag && (
        <>
          <p className="p-5 text-secondary">
            {data[method].description || "Description is empty"}
          </p>
          <h6>Responses</h6>

          <div className="flex flex-col gap-4 bg-background p-5 rounded-lg">
            {responses.map((response, index) => (
              <ResponseItem
                key={index}
                status={response[0]}
                response={response[1]}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
