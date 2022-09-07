import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import companyRautes from "./routes/company.routes";

const app = express();
app.use(express.json());

app.use("/company", companyRautes)

app.use(handleErrorMiddleware)

export default app;
