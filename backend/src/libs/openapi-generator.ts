import parser from "@babel/parser";
import traverse from "@babel/traverse";
import { GeneratorResult } from "./types.js";
import parseMethods from "./parsers/parseMethods.js";
import parseResponses from "./parsers/parseResponses.js";
import parseHeaders from "./parsers/parseHeaders.js";

export function generatorOpenapi(code: string) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript"], // обязательно для TS-кода
  });

  let route: Partial<GeneratorResult> = { headers: [] };

  traverse.default(ast, {
    CallExpression(path) {
      parseMethods(path, route);
      parseResponses(path, route);
      parseHeaders(path, route);
    },
    AssignmentExpression(path) {
      const node = path.node;
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "res" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "statusCode" &&
        node.operator === "="
      ) {
        if (node.right.type === "NumericLiteral") {
          route.statusCode = node.right.value;
        }
      }
    },
  });
  return route;
}
