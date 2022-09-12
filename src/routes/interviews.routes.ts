import { Router } from "express";
import { createInterviewController, 
    listInterviewByUserController,
    listIterviewByVacancyController,
    editIterviewController,
    deleteIterviewController } from "../controllers/interview.controller";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";
import verifyPersonAuthToken from "../middlewares/verifyPersonAuthToken.middleware";


const iterviewsRoutes = Router();

iterviewsRoutes.post("", companyAuthMiddleware, createInterviewController);
iterviewsRoutes.get("/user/:id", verifyPersonAuthToken, listInterviewByUserController);
iterviewsRoutes.get("/vacancy/:id", companyAuthMiddleware, listIterviewByVacancyController);
iterviewsRoutes.patch("/:id", companyAuthMiddleware, editIterviewController);
iterviewsRoutes.delete("/:id", companyAuthMiddleware, deleteIterviewController);

export default iterviewsRoutes;