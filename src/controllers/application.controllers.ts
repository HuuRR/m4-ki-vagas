import { Request, Response } from "express";
import createApplicationService from "../services/application/createApplication.service";
import updateApplicationAvailabilityService from "../services/application/updateApplicationAvailability.service";
import listApplicationByVacanciesService from "../services/application/listApplicationByVacancies.service";

const createApplicationControllers = async (
  request: Request,
  response: Response
) => {
  const { vacancyId } = request.params;

  const { decoded: { id: userId }} = JSON.parse(request.headers.authorization!);

  const newAplication = await createApplicationService({ userId, vacancyId });

  return response.status(201).json(newAplication);
};

const updateApplicationAvailabilityController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { id } = request.params;
  const { isActive, valid } = request.body;

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

  const listApplication = await listApplicationByVacanciesService(id);
  response.status(200).json(listApplication);
};

export {
  createApplicationControllers,
  updateApplicationAvailabilityController,
  listApplicationByVacanciesController,
};
