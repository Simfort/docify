import { ParamsConvert } from "../types";
import { checkBackendAPI } from "../utils";

export async function convertCode({
  code,
  file,
  ai,
  mode,
}: Partial<ParamsConvert>) {
  if (!mode) {
    const response = await fetch(`${checkBackendAPI()}/gen`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, ai }),
    });
    return response.json();
  } else if (mode === 1) {
    if (file) {
      return fileFetch(file);
    } else {
      throw new Error("File is not defined");
    }
  } else if (mode === 2) {
    return aiFetch(file!);
  }
}

export const fileFetch = async (file: File) => {
  console.log(1);
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${checkBackendAPI()}/gen/files`, {
    method: "POST",

    body: formData,
  });
  return response.json();
};
export const aiFetch = async (file: File) => {
  const response = await fetch(`${checkBackendAPI()}/gen/ai`, {
    method: "POST",

    body: JSON.stringify({ file }),
  });
  return response.json();
};
