import { Router } from "express";
import { createCompanyControllers, deleteCompanyControllers, retrieveCompanyControllers, updateCompanyControllers } from "../controllers/company.controllers";
import loginCompanyControllers from "../controllers/loginCompany.controlers";
import companyAuthMiddleware from "../middlewares/companyAuth.middleware";

const companyRautes = Router()

companyRautes.post('', createCompanyControllers)
companyRautes.get('/:id',companyAuthMiddleware, retrieveCompanyControllers)
companyRautes.patch('/:id', companyAuthMiddleware, updateCompanyControllers)
companyRautes.delete('/:id', companyAuthMiddleware, deleteCompanyControllers)

companyRautes.post('/login',loginCompanyControllers)

export default companyRautes