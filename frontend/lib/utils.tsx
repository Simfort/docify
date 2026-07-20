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
    title: "Saves time.",
    text: "Skip hours of manual JSDoc writing and repetitive updates.",
  },
  {
    title: "Stays accurate.",
    text: "The spec reflects the actual code, not outdated comments.",
  },
  {
    title: "Scales with your project.",
    text: "Handle single files or entire repositories with ZIP parsing.",
  },
  {
    title: "Handles edge cases. ",
    text: " AI‑assisted parsing covers tricky or incomplete code paths.",
  },
];

export const QUESTIONS: Question[] = [
  {
    question: "How does Docify generate OpenAPI without JSDoc?",
    answer:
      "Docify statically analyzes Express route definitions to extract HTTP methods, paths, URL/query parameters, request bodies, and basic responses. For complex or ambiguous cases, the AI‑assisted parsing module fills in missing details based on code structure and TypeScript types, ensuring a more complete OpenAPI spec.",
  },
  {
    question: "What file types and project setups are supported?",
    answer:
      "Docify supports JavaScript and TypeScript files within an Express app structure. You can upload individual files or a full project as a ZIP archive—the parser will scan all JS/TS files and aggregate them into a single OpenAPI specification.",
  },
  {
    question: "How accurate is the generated spec without manual comments?",
    answer:
      "Accuracy is high for standard Express patterns: routes, methods, and basic parameters are reliably detected. Details like field types, examples, and descriptions may be incomplete in some cases—that’s where AI augmentation helps fill the gaps. Using TypeScript and clear variable names improves inference quality.",
  },
  {
    question: "What exactly does AI‑assisted parsing do?",
    answer:
      "AI parsing kicks in when static analysis isn’t enough: it reconstructs request/response schemas for complex handlers, infers missing parameters in partially undocumented routes, and adds reasonable examples and descriptions based on function names, variable usage, and common API patterns. It doesn’t guess blindly—it uses context from your code to make educated assumptions while keeping the spec consistent with your actual implementation.",
  },
  {
    question: "Does Docify support TypeScript projects?",
    answer:
      "Absolutely. TypeScript types significantly improve the quality of the generated spec—Docify leverages them to infer precise schemas for request bodies and responses, reducing the need for AI augmentation and increasing overall accuracy.",
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
