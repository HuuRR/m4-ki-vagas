import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import userRoutes from "./routes/user.routes"

const app = express();
app.use(express.json());

app.use("/users", userRoutes)

app.use(errorHandlerMiddleware)

export default app;