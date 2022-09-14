import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { Vacancies } from "../entities/vacancies.entity";
import { AppError } from "../errors/AppError";
import { IVacancy } from "../interfaces/vacancies";
import createVacancyService from "../services/vacancies/createVacancy.service";
import deleteVacancyService from "../services/vacancies/deleteVacancy.service";
import listVacanciesService from "../services/vacancies/listVacancies.service";
import listVacancyByIdService from "../services/vacancies/listVacancyById.service";
import updateVacancyservice from "../services/vacancies/updateVacancy.service";

const createVacancyController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { name, salary, description, companyId, vacancy_skills } = request.body;

  const vancancy: IVacancy = await createVacancyService({
    name,
    salary,
    description,
    companyId,
    vacancy_skills,
  });

  response.status(201).json(vancancy);
};

const listVacanciesController = async (
  _request: Request,
  response: Response
): Promise<void> => {
  const listVacancies = await listVacanciesService();

  response.status(200).json(listVacancies);
};

const listVacancyByIdController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;

  const vacancyRepository = AppDataSource.getRepository(Vacancies);

  const thisvacancy = await vacancyRepository.findOne({ where: { id: id } });

  if (!thisvacancy) {
    throw new AppError("Data not found.", 404);
  }

  const vacancy: Vacancies = await listVacancyByIdService(id);

  response.status(200).json(vacancy);
};

const updateVacancyController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;

  const vacancyRepository = AppDataSource.getRepository(Vacancies);

  const thisvacancy = await vacancyRepository.findOne({ where: { id: id } });

  if (!thisvacancy) {
    throw new AppError("Data not found.", 404);
  }

  const { name, salary, description, vacancy_skills } = request.body;

  const vacancy: Vacancies = await updateVacancyservice(id, {
    name,
    salary,
    description,
    vacancy_skills,
  });

  response.status(200).json(vacancy);
};

const deleteVacancyController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;

  const vacancyRepository = AppDataSource.getRepository(Vacancies);

  const thisvacancy = await vacancyRepository.findOne({ where: { id: id } });

  if (!thisvacancy) {
    throw new AppError("Data not found.", 404);
  }

  const message: string = await deleteVacancyService(id);

  response.status(200).json({ message });
};

export {
  createVacancyController,
  listVacanciesController,
  listVacancyByIdController,
  updateVacancyController,
  deleteVacancyController,
};
