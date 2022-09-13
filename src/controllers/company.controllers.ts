import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { ICompanyLogin } from "../interfaces/companies";
import createCompanyService from "../services/company/createCompany.service";
import retrieveCompanyService from "../services/company/retrieveCompany.service";
import deleteCompanyService from "../services/company/deleteCompany.service";
import updateCompanyService from "../services/company/updateCompany.service";
import loginCompanyService from "../services/company/loginCompany.service";


const createCompanyControllers = async (request: Request, response: Response) => {
  const { name, CNPJ, cidade_estado, qtde_funcionarios, email, password } = request.body;

  const newCompany = await createCompanyService({ name, CNPJ, cidade_estado, qtde_funcionarios, email, password });

  return response.status(201).json(instanceToPlain(newCompany));
};

const retrieveCompanyControllers = async (request: Request, response: Response) => {
  const { id } = request.params;

  const company = await retrieveCompanyService(id);

  return response.status(200).json(company);
};

const updateCompanyControllers = async (request: Request, response: Response) => {
  const { id } = request.params;

  const { name, CNPJ, cidade_estado, qtde_funcionarios, email, password } = request.body;

  const company = await updateCompanyService(id, { name, CNPJ, cidade_estado, qtde_funcionarios, email, password });

  return response.status(200).json(company);
};

const deleteCompanyControllers = async (request: Request, response: Response) => {
  const { id } = request.params;

  await deleteCompanyService(id);

  response.status(200).json({ message: "Company deleted with success." });
};

const loginCompanyControllers = async (request:Request, response:Response)  => {
  const { email, password, CNPJ }: ICompanyLogin = request.body;

  const token = await loginCompanyService({ email, password, CNPJ });

  return response.json({token});
};

export { createCompanyControllers,
  retrieveCompanyControllers,
  updateCompanyControllers,
  deleteCompanyControllers,
  loginCompanyControllers
};