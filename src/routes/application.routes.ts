import { Router } from "express";
import createApplicationControllers from "../controllers/application.controllers";
import verifyPersonAuthToken from "../middlewares/verifyPersonAuthToken.middleware";


const aplicationRoutes = Router();

aplicationRoutes.post("/:id", verifyPersonAuthToken,createApplicationControllers);

export default aplicationRoutes



