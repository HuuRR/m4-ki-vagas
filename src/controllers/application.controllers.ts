import { Request, Response } from "express";
import createApplicationService from "../services/application/createApplication.service";
import updateApplicationAvailabilityService from "../services/application/updateApplicationAvailability.service";
import listApplicationByVacanciesService from "../services/application/listApplicationByVacancies.service";
import AppDataSource from "../data-source";
import { Vacancies } from "../entities/vacancies.entity";
import { AppError } from "../errors/AppError";
import { Applications } from "../entities/applications.entity";

const createApplicationControllers = async (
  request: Request,
  response: Response
) => {
  const { vacancyId } = request.params;

  const vacancyRepository = AppDataSource.getRepository(Vacancies);

  const thisvacancy = await vacancyRepository.findOne({
    where: { id: vacancyId },
  });

  if (!thisvacancy) {
    throw new AppError("Data not found.", 404);
  }

  const {
    decoded: { id: userId },
  } = JSON.parse(request.headers.authorization!);

  const newAplication = await createApplicationService({ userId, vacancyId });

  return response.status(201).json(newAplication);
};

const updateApplicationAvailabilityController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;
  const { isActive, valid } = request.body;

  const applicationRepository = AppDataSource.getRepository(Applications);

  const thisApplication = await applicationRepository.findOne({
    where: { id: id },
  });

  if (!thisApplication) {
    throw new AppError("Data not found.", 404);
  }

  const updatedApplication = await updateApplicationAvailabilityService(id, {
    isActive,
    valid,
  });

  response.status(200).json(updatedApplication);
};
const listApplicationByVacanciesController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;

  const applicationRepository = AppDataSource.getRepository(Applications);

  const thisApplication = await applicationRepository.findOne({
    where: { id: id },
  });

  if (!thisApplication) {
    throw new AppError("Data not found.", 404);
  }

  const listApplication = await listApplicationByVacanciesService(id);
  response.status(200).json(listApplication);
};

export {
  createApplicationControllers,
  updateApplicationAvailabilityController,
  listApplicationByVacanciesController,
};
