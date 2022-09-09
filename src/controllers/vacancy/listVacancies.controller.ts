import { Request, Response } from "express";
import listVacanciesService from "../../services/vacancies/listVacancies.service";

const listVacanciesController = async (req: Request, res: Response) => {
  const listVacancies = await listVacanciesService();

  return res.status(200).json(listVacancies);
};

export default listVacanciesController;
