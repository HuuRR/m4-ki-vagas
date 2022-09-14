import { Router } from "express";

import verifyPersonAuthToken from "../middlewares/verifyPersonAuthToken.middleware";
import {
  createApplicationControllers,
  listApplicationByVacanciesController,
  updateApplicationAvailabilityController,
} from "../controllers/application.controllers";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";

const aplicationRoutes = Router();

aplicationRoutes.post(
  "/:id",
  verifyPersonAuthToken,
  createApplicationControllers
);
aplicationRoutes.patch(
  "/:id",
  companyAuthMiddleware,
  updateApplicationAvailabilityController
);
aplicationRoutes.get(
  "/:id",
  companyAuthMiddleware,
  listApplicationByVacanciesController
);

export default aplicationRoutes;
