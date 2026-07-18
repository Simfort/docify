import { CircleSlashIcon, Files, Star } from "lucide-react";
import { Question, Schema } from "./types";

export const PAINS = [
  "You spend an hour documenting your API, and 10 minutes later a teammate tweaks a route. Now your docs are wrong.",
  "Your OpenAPI spec is a separate artifact that drifts from reality until someone notices in production.",
  "You’re duplicating work: route definitions in code, then again in Swagger annotations or YAML.",
  "When onboarding a new frontend engineer, you cringe at handing them outdated docs.",
];
export const ACTUALS = [
  {
    title: "Docs stay in sync automatically. ",
    text: "Every time the code changes, the generated spec reflects it. No more “please update the docs” tickets.",
  },
  {
    title: "Validation catches mistakes early.",
    text: "Spectral surfaces issues before they break integrations or confuse new hires.",
  },
  {
    title: "No AI hallucinations.",
    text: "The spec comes strictly from your actual routes and JSDoc. What you see is what your server does.",
  },
  {
    title: "CI/CD ready.",
    text: "Because the validation logic is a standalone service, you can block deployments if the spec is invalid.",
  },
  {
    title: "Minimal overhead.",
    text: "No new decorators, no separate YAML files to maintain. Just your existing Express code and comments.",
  },
];

export const QUESTIONS: Question[] = [
  {
    question: "Isn’t this just another code generator?",
    answer:
      "It’s not about generating new code. It’s about turning your existing Express routes + JSDoc into a machine‑readable OpenAPI spec without duplication.",
  },
  {
    question: "Do I have to rewrite my routes with special annotations?",
    answer:
      "No. Docify uses your existing JSDoc comments. If you don’t have them, it tells you clearly instead of guessing.",
  },
  {
    question: "What if my spec has errors?",
    answer:
      "Spectral runs automatically and reports warnings/errors so you fix them before handing off the API contract.",
  },
  {
    question: "Can I automate this?",
    answer:
      "Yes. The validation service is designed to be called from CI/CD pipelines. You can fail the build if the spec isn’t valid.",
  },
];
export const LIST_RESPONSE = ["JSON", "YAML"];

export const MODES = [
  <p key={0} className="flex gap-2">
    <CircleSlashIcon />
    Classic
  </p>,
  <p key={1} className="flex gap-2">
    <Files />
    Files
  </p>,
];

export const checkBackendAPI = () => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (api) {
    return api;
  } else {
    throw new Error("NEXT PUBLIC API URL - UNDEFINED");
  }
};
//@ts-expect-error Error Schema
export const deepPropertiesSchema = (schema: Schema) => {
  if (!schema) return undefined;

  switch (schema.type) {
    case "object":
      if (!schema.properties) return {};
      const obj: Record<string, unknown> = {};
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        obj[key] = deepPropertiesSchema(propSchema);
      }
      return obj;

    case "array":
      // Если есть example у массива — возвращаем его, иначе делаем заглушку
      if (schema.example !== undefined) return schema.example;
      //@ts-expect-error Error Schema
      const itemExample = deepPropertiesSchema(schema.items);
      return [itemExample]; // массив из одного элемента как пример

    case "string":
      return schema.example ?? "example-string";

    case "integer":
      return schema.example ?? 0;

    case "number":
      return schema.example ?? 0.0;

    case "boolean":
      return schema.example ?? false;

    default:
      return undefined;
  }
};
