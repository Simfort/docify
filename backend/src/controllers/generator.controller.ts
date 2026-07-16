import { Request, Response } from "express";
import { formatToJSONOpenAPI, splitCode } from "../libs/utils.js";
import { generatorOpenapi } from "../libs/openapi-generator.js";
import { GeneratorResult } from "../libs/types.js";

export const genOpenAPI = async (req: Request, res: Response) => {
  try {
    const { code, root }: { code: string; root: string } = await req.body;

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
