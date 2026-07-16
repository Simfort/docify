import type { NodePath } from "@babel/core";
import type { CallExpression } from "@babel/types";
import { GeneratorResult } from "../types.js";

export default function parseMethods(
  path: NodePath<CallExpression>,
  route: Partial<GeneratorResult>,
) {
  const node = path.node;

  if (
    node.callee.type === "MemberExpression" &&
    node.callee.object.type === "Identifier" &&
    node.callee.object.name &&
    node.callee.property.type === "Identifier" &&
    ["get", "post", "put", "patch", "delete"].includes(
      node.callee.property.name,
    )
  ) {
    const method = node.callee.property.name as
      | "get"
      | "post"
      | "put"
      | "patch"
      | "delete";
    const arg0 = node.arguments[0];
    let pathValue: string | null = null;

    if (arg0?.type === "StringLiteral") {
      pathValue = arg0.value;
    } else if (arg0?.type === "TemplateLiteral") {
      pathValue = arg0.quasis.map((q) => q.value.cooked).join("${}");
    }

    if (pathValue) {
      route.method = method;
      route.path = pathValue;
    }
  }
  return route;
}
