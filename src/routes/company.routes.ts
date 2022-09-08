import { Router } from "express";
import { createCompanyControllers, 
        deleteCompanyControllers, 
        retrieveCompanyControllers, 
        updateCompanyControllers } from "../controllers/company.controllers";

const companyRoutes = Router()

companyRoutes.post('', createCompanyControllers)
companyRoutes.get('/:id', retrieveCompanyControllers)
companyRoutes.patch('/:id', updateCompanyControllers)
companyRoutes.delete('/:id', deleteCompanyControllers)

export default companyRoutes