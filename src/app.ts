import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";

import userRoutes from "./routes/user.routes";

import iterviewsRoutes from "./routes/interviews.routes";
import companyRoutes from "./routes/company.routes";

const app = express();
app.use(express.json());

app.use("/company", companyRoutes);
app.use("/users", userRoutes);
app.use("/interviews", iterviewsRoutes);

app.use(handleErrorMiddleware);

export default app;
