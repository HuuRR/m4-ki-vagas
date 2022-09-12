import { Router } from "express";
import { createInterviewController } from "../controllers/interview.controller";
import { listInterviewByUserController } from "../controllers/interview.controller";
import { listIterviewByVacancyController } from "../controllers/interview.controller";
import { editIterviewController } from "../controllers/interview.controller";
import { deleteIterviewController } from "../controllers/interview.controller";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";
import verifyPersonAuthToken from "../middlewares/verifyPersonAuthToken.middleware";

const iterviewsRoutes = Router();

iterviewsRoutes.post("", companyAuthMiddleware, createInterviewController);
iterviewsRoutes.get("/user/:id", verifyPersonAuthToken, listInterviewByUserController);
iterviewsRoutes.get("/vacancy/:id", companyAuthMiddleware, listIterviewByVacancyController);
iterviewsRoutes.patch("/:id", companyAuthMiddleware, editIterviewController);
iterviewsRoutes.delete("/:id", companyAuthMiddleware, deleteIterviewController);

export default iterviewsRoutes;
