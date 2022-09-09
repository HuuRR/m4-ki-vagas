import { Router } from "express";
import createVacancyController from "../controllers/vacancy/createVacancy.controller";
import { deleteVacancyController } from "../controllers/vacancy/deleteVacancy.controller";
import listVacanciesController from "../controllers/vacancy/listVacancies.controller";
import { listVacancyByIdController } from "../controllers/vacancy/listVacancyById.controller";
import { updateVacancyController } from "../controllers/vacancy/updateVacancy.controller";

const vancancyRoutes = Router();

vancancyRoutes.post("", createVacancyController);
vancancyRoutes.get("", listVacanciesController);
vancancyRoutes.get("/:id", listVacancyByIdController);
vancancyRoutes.patch("/:id", updateVacancyController);
vancancyRoutes.delete("/:id", deleteVacancyController);

export default vancancyRoutes;
