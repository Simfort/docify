import { Router } from "express";
import {
  genOpenAPI,
  genFileOpenApi,
} from "../controllers/generator.controller.js";

export const routerGenerator = Router();

routerGenerator.post("/", genOpenAPI);
routerGenerator.post("/files", genFileOpenApi);
