import { Router } from "express";
import {
  createVacancyController,
  listVacanciesController,
  listVacancyByIdController,
  updateVacancyController,
  deleteVacancyController,
  updateApplicationAvailabilityController,
  listApplicationByVacanciesController,
} from "../controllers/vacancy.controllers";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";

const vancancyRoutes = Router();

vancancyRoutes.post("", companyAuthMiddleware, createVacancyController);
vancancyRoutes.get("", listVacanciesController);
vancancyRoutes.get("/:id", listVacancyByIdController);
vancancyRoutes.patch("/:id", companyAuthMiddleware, updateVacancyController);
vancancyRoutes.delete("/:id", companyAuthMiddleware, deleteVacancyController);
vancancyRoutes.patch(
  "/application/:id",
  companyAuthMiddleware,
  updateApplicationAvailabilityController
);
vancancyRoutes.get(
  "application/:id",
  companyAuthMiddleware,
  listApplicationByVacanciesController
);

export default vancancyRoutes;
