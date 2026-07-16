import {
  ObjectExpression,
  ObjectMethod,
  ObjectProperty,
  SpreadElement,
} from "@babel/types";

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

  value: any;
};
export type PropertyNode =
  | SpreadElement
  | ObjectMethod
  | ObjectProperty
  | ObjectExpression;
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
