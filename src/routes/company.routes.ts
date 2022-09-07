import { Router } from "express";
import { createCompanyControllers, deleteCompanyControllers, retrieveCompanyControllers, updateCompanyControllers } from "../controllers/company.controllers";

const companyRautes = Router()

companyRautes.post('', createCompanyControllers)
companyRautes.get('/:id', retrieveCompanyControllers)
companyRautes.patch('/:id', updateCompanyControllers)
companyRautes.delete('/:id', deleteCompanyControllers)

export default companyRautes