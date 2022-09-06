import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import userRoutes from "./routes/user.routes"
import loginRoutes from "./routes/login.routes"

const app = express();
app.use(express.json());

app.use("/users", userRoutes)
app.use("/login", loginRoutes)

app.use(errorHandlerMiddleware)

export default app;