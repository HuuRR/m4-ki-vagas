import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import userRoutes from "./routes/user.routes";
import interviewsRoutes from "./routes/interviews.routes";
import companyRoutes from "./routes/company.routes";
import vacancyRoutes from "./routes/vacancy.routes";

const app = express();
app.use(express.json());

app.use("/company", companyRoutes);
app.use("/users", userRoutes);
app.use("/interviews", interviewsRoutes);
app.use("/vacancies", vacancyRoutes)

app.use(handleErrorMiddleware);

export default app;

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/vacancies", vancancyRoutes);

app.use(errorHandlerMiddleware);
