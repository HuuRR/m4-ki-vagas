import { Request, Response } from "express";
import { IVacancy } from "../../interfaces/vacancies";
import createVacancyService from "../../services/vacancies/createVacancy.service";

const createVacancyController = async (req: Request, res: Response) => {
  const { name, salary, description } = req.body;

  const vancancy: IVacancy = await createVacancyService({
    name,
    salary,
    description,
  });

  return res.status(201).json(vancancy);
};

export default createVacancyController;
