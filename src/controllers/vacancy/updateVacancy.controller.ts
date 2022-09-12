import { Request, Response } from "express";
import { ServiceResponse } from "../../interfaces";
import updateVacancyservice from "../../services/vacancies/updateVacancy.service";

export async function updateVacancyController(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params
  const { name, salary, description, vacancy_skills, companyId } = request.body;

  const serviceResponse: ServiceResponse = await updateVacancyservice(id, {
    name,
    salary,
    description,
    vacancy_skills
  });

  response.status(serviceResponse.status).json(serviceResponse.response);
}
