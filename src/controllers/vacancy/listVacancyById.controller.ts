import { Request, Response } from "express";
import { ServiceResponse } from "../../interfaces";
import listVacancyByIdService from "../../services/vacancies/listVacancyById.service";

export async function listVacancyByIdController(
  request: Request,
  response: Response
): Promise<void> {
  const { id } = request.params;

  const serviceResponse: ServiceResponse = await listVacancyByIdService(id);

  response.status(serviceResponse.status).json(serviceResponse.response);
}
