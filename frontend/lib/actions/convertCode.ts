import { ParamsConvert } from "../types";
import { checkBackendAPI } from "../utils";

export async function convertCode({
  code,
  file,
  ai,
  mode,
  root,
}: Partial<ParamsConvert>) {
  if (!mode) {
    try {
      const response = await fetch(`${checkBackendAPI()}/gen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ code, ai, root }),
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  } else if (mode === 1) {
    if (file) {
      return fileFetch({ file, ai: ai, root });
    } else {
      throw new Error("File is not defined");
    }
  }
}

export const fileFetch = async ({ file, ai, root }: Partial<ParamsConvert>) => {
  try {
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("root", String(root));
    formData.append("ai", String(ai));
    const response = await fetch(`${checkBackendAPI()}/gen/files`, {
      method: "POST",
      keepalive: true,
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
