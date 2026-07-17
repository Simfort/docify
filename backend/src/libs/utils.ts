import { GeneratorResult, OpenAPIFormat } from "./types.js";

export function splitCode(code: string, root: string): string[] {
  const escapedRoot = root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regexStr = `(?=${escapedRoot}\\.)`;
  const regex = new RegExp(regexStr, "g");
  const parts = code.split(regex);

  return parts.filter((part) => part.trim().length > 0);
}

export function formatToJSONOpenAPI(routes: GeneratorResult[]) {
  const paths = {} as OpenAPIFormat;
  for (const item of routes) {
    const type = Array.isArray(item.value) ? "array" : typeof item.value;
    paths[item.path] = {
      ...paths[item.path],
      [item.method]: {
        responses: {
          [item.statusCode || 200]: {
            headers: item.headers,
            content: {
              [item.contentType || "application/json"]: {
                schema: { type, example: item.value },
              },
            },
          },
        },
      },
    };
  }
  return paths;
}
