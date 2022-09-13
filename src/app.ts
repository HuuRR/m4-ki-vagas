import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middlewares";
import userRoutes from "./routes/user.routes";
import interviewsRoutes from "./routes/interviews.routes";
import companyRoutes from "./routes/company.routes";
import vacancyRoutes from "./routes/vacancy.routes";
import aplicationRoutes from "./routes/application.routes";

const app = express();
app.use(express.json());

app.use("/company", companyRoutes);
app.use("/users", userRoutes);
app.use("/interviews", interviewsRoutes);
app.use("/vacancies", vacancyRoutes)
app.use("/application", aplicationRoutes)

app.use(handleErrorMiddleware);

export default app;