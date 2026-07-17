import { Request, Response } from "express";
import { formatToJSONOpenAPI, splitCode } from "../libs/utils.js";
import { generatorOpenapi } from "../libs/openapi-generator.js";
import { GeneratorResult } from "../libs/types.js";
import AdmZip from "adm-zip";
import { Busboy } from "@fastify/busboy";
import openai from "../configs/openai.js";

export const genOpenAPI = async (req: Request, res: Response) => {
  try {
    const { code, root, ai }: { code: string; root: string; ai: boolean } =
      await req.body;
    if (ai) {
      const result = await genAi(code);

      return res.json({ data: result }).status(200);
    }

    const splitedCode = splitCode(code, root || "app");

    const routes = [];

    for (const stroke of splitedCode) {
      routes.push(generatorOpenapi(stroke));
    }

    return res
      .json({ data: formatToJSONOpenAPI(routes as GeneratorResult[]) })
      .status(200);
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal Server Error" }).status(500);
  }
};

export const genAi = async (code: string) => {
  try {
    const prompt = `You are an expert in OpenAPI/Swagger specifications and Node.js/Express architecture. Your task is to convert the provided server-side code snippet (JavaScript/TypeScript with Express routes) into a valid OpenAPI 3.0 specification.

Input: a code snippet containing Express route handlers (e.g., app.get, app.post, router.route, etc.).
Output: ONLY the OpenAPI specification in JSON format. Do not include any explanations, markdown code blocks, or comments outside the JSON.

Requirements:
- Extract only the routes that are explicitly defined in the code. Do not infer or add missing routes.
- For each route, include: path, method, summary, description (based on code comments or inferred intent), tags (as an array of strings).
- Include query, path, and header parameters if they are used in the route handler.
- Include requestBody only if the handler accesses req.body or uses body parsing logic.
- Define responses for at least 200 and common error codes (400, 404, 500). For 200, provide a basic schema (type, example fields).
- If the code includes middleware (e.g., auth, validation), mention it briefly in the description.
- Do not include global fields like 'info', 'servers', or 'securityDefinitions'. Return only 'paths' and, if needed, 'components/schemas'.
- Ensure the JSON is valid and ready to be consumed programmatically.GIVE ME ONLY JSON

Code to convert:${code}
`;
    const response = await openai.chat.completions.create({
      model: "tencent/hy3:free",
      messages: [
        {
          role: "system",
          content:
            "You are a precise code-to-OpenAPI converter. Output only valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });
    if (response.choices[0].message.content)
      return JSON.parse(response.choices[0].message.content);
    else {
      return { error: "message is not define" };
    }
  } catch (error) {
    console.error(error);
  }
};

export const genFileOpenApi = async (req: Request, res: Response) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType) {
      return res.status(400).json({ error: "Missing Content-Type header" });
    }

    const ctString =
      typeof contentType === "string" ? contentType : contentType[0];

    const busboy = new Busboy({
      headers: { "content-type": ctString },
    });

    let zipBuffer: Buffer | null = null;
    const fields: Record<string, string> = {};

    busboy.on("file", (fieldname, file, info) => {
      if (fieldname !== "file") return;

      const chunks: Buffer[] = [];
      file.on("data", (chunk) => chunks.push(chunk));
      file.on("end", () => {
        zipBuffer = Buffer.concat(chunks);
      });
    });
    busboy.on("field", (fieldname, value) => {
      if (typeof value === "string") {
        fields[fieldname] = value;
      } else {
        fields[fieldname] = String(value);
      }
    });

    return new Promise<void>((resolve) => {
      busboy.on("finish", () => {
        if (!zipBuffer) {
          return res.status(400).json({ error: "File is not defined" });
        }

        try {
          const zip = new AdmZip(zipBuffer);
          const entries = zip.getEntries();
          const jsFiles = entries
            .filter((entry) => entry.entryName.toLowerCase().endsWith(".js"))
            .map((entry) => ({
              name: entry.entryName,
              content: entry.getData().toString("utf8"),
            }));
          const routes = [];
          for (const jsFile of jsFiles) {
            const content = splitCode(jsFile.content, fields.root || "app");
            for (const item of content) {
              routes.push(generatorOpenapi(item));
            }
          }

          res
            .json({ data: formatToJSONOpenAPI(routes as GeneratorResult[]) })
            .status(200);
          resolve();
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to extract ZIP" });
          resolve();
        }
      });

      busboy.on("error", (err) => {
        console.error(err);
        res.status(500).json({ error: "Busboy error" });
        resolve();
      });

      req.pipe(busboy);
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: "Internal Server Error" }).status(500);
  }
};
