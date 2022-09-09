import { Request, Response } from "express";
import { ServiceResponse } from "../../interfaces";
import deleteVacancyService from "../../services/vacancies/deleteVacancy.service";

export async function deleteVacancyController(
  request: Request,
  response: Response
): Promise<void> {
  const { description } = request.body;

  const serviceResponse: ServiceResponse = await deleteVacancyService(
    description
  );

  response.status(serviceResponse.status).json(serviceResponse.response);
}
