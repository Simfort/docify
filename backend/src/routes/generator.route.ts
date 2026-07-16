import { Router } from "express";
import { genOpenAPI } from "../controllers/generator.controller.js";

export const routerGenerator = Router();

routerGenerator.post("/", genOpenAPI);
