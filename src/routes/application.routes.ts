import { Router } from "express";
import {
  createApplicationControllers,
  listApplicationByVacanciesController,
  updateApplicationAvailabilityController,
} from "../controllers/application.controllers";
import verifyPersonAuthToken from "../middlewares/verifyPersonAuthToken.middleware";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";

const aplicationRoutes = Router();

aplicationRoutes.post("/:vacancyId", verifyPersonAuthToken, createApplicationControllers);
aplicationRoutes.patch("/:id", companyAuthMiddleware, updateApplicationAvailabilityController);
aplicationRoutes.get("/:id", companyAuthMiddleware, listApplicationByVacanciesController);

export default aplicationRoutes;
