import { Router } from "express";
import { createCompanyControllers, 
    deleteCompanyControllers, 
    retrieveCompanyControllers, 
    updateCompanyControllers, 
    loginCompanyControllers } from "../controllers/company.controllers";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";

const companyRoutes = Router();

companyRoutes.post('', createCompanyControllers);
companyRoutes.get('/:id',companyAuthMiddleware, retrieveCompanyControllers);
companyRoutes.patch('/:id', companyAuthMiddleware, updateCompanyControllers);
companyRoutes.delete('/:id', companyAuthMiddleware, deleteCompanyControllers);
companyRoutes.post('/login',loginCompanyControllers);


export default companyRoutes;