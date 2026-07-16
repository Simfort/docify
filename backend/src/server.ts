import express from "express";

import cors from "cors";
import { splitCode } from "./libs/utils.js";
import { routerGenerator } from "./routes/generator.route.js";
import { generatorOpenapi } from "./libs/openapi-generator.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/gen", routerGenerator);

app.listen(port, () => console.log(` running on ${port}`));
