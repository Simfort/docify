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
