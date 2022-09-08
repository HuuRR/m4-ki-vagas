import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import companyRoutes from "./routes/company.routes";
import userRoutes from "./routes/user.routes";
import iterviewsRoutes from "./routes/interviews.routes";

const app = express();
app.use(express.json());

app.use("/company", companyRoutes);
app.use("/users", userRoutes);
app.use("/interviews", iterviewsRoutes);


app.use(handleErrorMiddleware);

export default app;