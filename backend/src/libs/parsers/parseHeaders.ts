import type { NodePath } from "@babel/core";
import type {
  ArgumentPlaceholder,
  CallExpression,
  Expression,
  ObjectExpression,
  SpreadElement,
} from "@babel/types";
import { GeneratorResult } from "../types.js";

export default function parseHeaders(
  path: NodePath<CallExpression>,
  route: Partial<GeneratorResult>,
) {
  const node = path.node;

  if (
    node.callee.type === "MemberExpression" &&
    node.callee.object.type === "Identifier" &&
    node.callee.object.name &&
    node.callee.property.type === "Identifier" &&
    ["setHeader", "set", "setHeaders", "type"].includes(
      node.callee.property.name,
    )
  ) {
    const arg = node.arguments[0];
    if (node.callee.property.name === "type") {
      if (arg.type === "StringLiteral") {
        route.contentType = arg.value;
        route.parameters?.push({
          name: "Content-Type",
          in: "header",
          schema: {
            type: "string",
            default: arg.value,
          },
        });
        return;
      }
    } else if (arg.type === "ObjectExpression") {
      checkObject(arg, route);
    }

    const [left, right] = node.arguments;
    checkLeftRight(left, right, route);
  }
}

function checkObject(arg: ObjectExpression, route: Partial<GeneratorResult>) {
  for (const item of arg.properties) {
    if (
      item.type === "ObjectProperty" &&
      item.key.type === "StringLiteral" &&
      item.value.type === "StringLiteral"
    ) {
      if (item.key.value.toLowerCase() === "content-type") {
        route.contentType = item.value.value;
      }
      route.parameters?.push({
        name: item.key.value,
        in: "header",
        schema: {
          type: "string",
          default: item.value.value,
        },
      });
    }
  }
}
function checkLeftRight(
  left: Expression | SpreadElement | ArgumentPlaceholder,
  right: Expression | SpreadElement | ArgumentPlaceholder,
  route: Partial<GeneratorResult>,
) {
  if (left.type === "StringLiteral") {
    if (right.type === "StringLiteral") {
      const normVal = left.value.toLowerCase();
      if (normVal === "content-type") {
        route.contentType = right.value;
      }
      if (normVal === "set-cookie") {
        route.parameters?.push({
          name: left.value,
          in: "cookie",
          schema: {
            type: "string",
            default: right.value,
            minLength: 1,
          },
        });
        return;
      }
      route.parameters?.push({
        name: left.value,
        in: "header",
        schema: {
          type: "string",
          default: right.value,
        },
      });
    }
  }
}
