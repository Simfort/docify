export type IconProps = React.SVGProps<SVGSVGElement>;

export type Question = { question: string; answer: string };

export type Modes = 0 | 1;
export type ResponsesFormats = 0 | 1;

export type Settings = {
  root: string;
  mode: Modes;
  ai: boolean;
  responseFormat: ResponsesFormats;
};
export type UseSettings = {
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
};
export type UseCode = {
  code: string;
  response: OpenAPIFormat;
  file: File | null;

  setFile: (file: File | null) => void;
  setCode: (code: string) => void;
  setResponse: (response: OpenAPIFormat) => void;
};
export type GeneratorResult = {
  method: string;
  path: string;
  parameters: {
    name: string;
    in: "header" | "cookie" | "query";
    description?: string;
    schema: {
      type: string;
      enum?: string[];
      default: string;
      minLength?: number;
    };
  }[];
  contentType: string;
  statusCode: number;
};
export type ParamsConvert = {
  code: string;
  root: string;
  mode: Modes;
  ai: boolean;
  file: File;
  format: ResponsesFormats;
};
export type OpenAPIFormat = {
  [path: string]: {
    [method: string]: {
      parameters: GeneratorResult["parameters"];
      responses: {
        [statusCode: number]: {
          content: {
            [contentType: string]: {
              schema: {
                type: string;
                example: string;
              };
            };
          };
        };
      };
    };
  };
};
export type ResponsePaths = [string, ResponseMethodData];
export type ResponseMethodData = {
  [method: string]: {
    parameters?: GeneratorResult["parameters"];
    summary?: string;
    description?: string;
    tags?: string[];
    responses?: Responses;
  };
};
export type Responses = {
  [statusCode: number]: ResponseData;
};
export type ResponseData = {
  description?: string;
  content?: Content;
};
export type Content = {
  [contentType: string]: {
    schema?: Schema;
  };
};
export type Schema =
  | {
      type: "string";
      example?: string | number;
      format?: "date" | "date-time" | "email" | "uuid" | undefined;
    }
  | {
      type: "integer";
      format?: "int32" | "int64" | undefined;
      example?: number;
    }
  | {
      type: "number";
      format?: "float" | "double" | undefined;
      example?: number;
    }
  | {
      type: "boolean";
      example?: boolean;
    }
  | {
      type: "object";
      properties?: Record<string, Schema>;
      required?: string[];
    }
  | {
      type: "array";
      items: Schema;
      example?: unknown[];
    };

export type SchemaRec = Record<string, Schema>;
