import { Request, Response } from "express";
import { ServiceResponse } from "../../interfaces";
import updateVacancyservice from "../../services/vacancies/updateVacancy.service";

export async function updateVacancyController(
  request: Request,
  response: Response
): Promise<void> {
  const { name, salary, description } = request.body;

  const serviceResponse: ServiceResponse = await updateVacancyservice({
    name,
    salary,
    description,
  });

  response.status(serviceResponse.status).json(serviceResponse.response);
}
