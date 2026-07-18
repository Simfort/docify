import { ResponseData } from "@/lib/types";
import { deepPropertiesSchema } from "@/lib/utils";

export default function ResponseItem({
  status,
  response,
}: {
  status: string;
  response: ResponseData;
}) {
  console.log(response);
  const content = Object.entries(response.content || { "Not mime type": "hi" });

  const contentSchema = deepPropertiesSchema(content[0][1]?.schema);
  return (
    <div className="flex gap-10 ">
      <p>{status}</p>
      <div className="text-secondary flex flex-col gap-5">
        <p>{response.description}</p>{" "}
        <div>
          <p>Media Type:</p>{" "}
          <div className="bg-background border-accent border rounded-lg  px-5 w-50 text-center">
            <p>{content[0][0]}</p>
          </div>
        </div>{" "}
        <div>
          <p>Content:</p>
          <pre className="text-foreground bg-card w-50  p-2">
            {JSON.stringify(contentSchema, null, 2) || "No content"}
          </pre>
        </div>
      </div>
    </div>
  );
}
