import { Request, Response } from "express";
import listVacanciesService from "../../services/vacancies/listVacancies.service";

const listVacanciesController = async (req: Request, res: Response) => {
  const listVacancies = await listVacanciesService();

  return res.status(listVacancies.status).json(listVacancies.response);
};

export default listVacanciesController;
