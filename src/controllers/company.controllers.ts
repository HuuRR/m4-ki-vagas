import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import createCompanyService from "../services/company/createCompany.service";
import retrieveCompanyService from "../services/company/retrieveCompany.service";
import deleteCompanyService from "../services/company/deleteCompany.service";
import updateCompanyService from "../services/company/updateCompany.service";
import loginCompanyService from "../services/company/loginCompany.service";
import { ICompanyLogin } from "../interfaces/companies";

const createCompanyControllers = async (req: Request, res: Response) => {
  const { name, CNPJ, cidade_estado, qtde_funcionarios, email, password } =
    req.body;

  const newCompany = await createCompanyService({
    name,
    CNPJ,
    cidade_estado,
    qtde_funcionarios,
    email,
    password,
  });
  return res.status(201).json(instanceToPlain(newCompany));
};

const retrieveCompanyControllers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await retrieveCompanyService(id);
  return res.status(201).json(instanceToPlain(company));
};

const updateCompanyControllers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, CNPJ, cidade_estado, qtde_funcionarios, email, password } =
    req.body;
  const company = await updateCompanyService(id, {
    name,
    CNPJ,
    cidade_estado,
    qtde_funcionarios,
    email,
    password,
  });
  return res.status(201).json(instanceToPlain(company));
};

const deleteCompanyControllers = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteCompanyService(id);
  res.status(204).json({ message: "Empresa deletada com sucesso" });
};

const loginCompanyControllers = async (req:Request, res:Response)  => {
  const { email, password, CNPJ }: ICompanyLogin = req.body
  const token = await loginCompanyService({ email, password, CNPJ })
  return res.json({token})
}

export {
  createCompanyControllers,
  retrieveCompanyControllers,
  updateCompanyControllers,
  deleteCompanyControllers,
  loginCompanyControllers
};
