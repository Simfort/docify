import express from "express";

import cors from "cors";

import { routerGenerator } from "./routes/generator.route.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: "https://docify-anaw.vercel.app" }));

app.use("/gen", routerGenerator);

app.listen(port, () => console.log(` running on ${port}`));
