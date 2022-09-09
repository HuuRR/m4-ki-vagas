import { Router } from "express";
import { createInterviewController } from "../controllers/interview.controller";
import { listInterviewByUserController } from "../controllers/interview.controller";
import { listIterviewByVacancyController } from "../controllers/interview.controller";
import { editIterviewController } from "../controllers/interview.controller";
import { deleteIterviewController } from "../controllers/interview.controller";

const iterviewsRoutes = Router();

iterviewsRoutes.post("", createInterviewController);
iterviewsRoutes.get("/user/:id", listInterviewByUserController);
iterviewsRoutes.get("/vacancy/:id", listIterviewByVacancyController);
iterviewsRoutes.patch("/:id", editIterviewController);
iterviewsRoutes.delete("/:id", deleteIterviewController);

export default iterviewsRoutes;
