import type { NodePath } from "@babel/core";
import type { CallExpression } from "@babel/types";
import { GeneratorResult, PropertyNode } from "../types.js";

export default function parseResponses(
  path: NodePath<CallExpression>,
  route: Partial<GeneratorResult>,
) {
  const node = path.node;
  statusParse(node, route);
  if (
    node.callee.type === "MemberExpression" &&
    node.callee.object.type === "Identifier" &&
    node.callee.object.name === "res" &&
    node.callee.property.type === "Identifier" &&
    ["send", "json", "end"].includes(node.callee.property.name)
  ) {
    const resultNode = node.arguments[0];

    if (resultNode.type === "StringLiteral") {
      route.value = resultNode.value;
    } else if (resultNode.type === "ObjectExpression") {
      const properties = resultNode.properties;
      const responseValue = readObjectExpression(properties);

      route.value = responseValue;
    }
  }
}

export function readObjectExpression(properties: PropertyNode[]) {
  const out: Record<string, any> = {};
  for (const item of properties) {
    if (item.type !== "ObjectProperty") continue;

    const key = item.key;
    if (key.type !== "Identifier") continue;

    const valueNode = item.value;

    if (valueNode.type === "ObjectExpression") {
      out[key.name] = readObjectExpression(valueNode.properties);
    } else if (valueNode.type === "StringLiteral") {
      out[key.name] = valueNode.value;
    } else if (valueNode.type === "NumericLiteral") {
      out[key.name] = valueNode.value;
    } else if (valueNode.type === "BooleanLiteral") {
      out[key.name] = valueNode.value;
    } else {
      out[key.name] = null;
    }
  }
  return out;
}
export function statusParse(
  node: CallExpression,
  route: Partial<GeneratorResult>,
) {
  if (
    node.callee.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    (node.callee.property.name === "status" ||
      node.callee.property.name === "sendStatus")
  ) {
    const resultNode = node.arguments[0];
    if (resultNode.type === "NumericLiteral") {
      route.statusCode = resultNode.value;
    } else {
      throw new Error("Status code must be number!");
    }
  }
}
