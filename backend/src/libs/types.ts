import {
  ObjectExpression,
  ObjectMethod,
  ObjectProperty,
  SpreadElement,
} from "@babel/types";

export type GeneratorResult = {
  method: string;
  path: string;
  headers: {
    name: string;
    description?: string;
    schema: {
      type: string;
      example: string;
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
      responses: {
        [statusCode: number]: {
          headers: GeneratorResult["headers"];
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
