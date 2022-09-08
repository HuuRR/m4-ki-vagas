import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import companyRautes from "./routes/company.routes";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import userRoutes from "./routes/user.routes"

const app = express();
app.use(express.json());


app.use("/company", companyRautes)

app.use(handleErrorMiddleware)

export default app;
app.use("/users", userRoutes)

app.use(errorHandlerMiddleware)


