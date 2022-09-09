import AppDataSource from "../../data-source";
import { Vacancies } from "../../entities/vacancies.entity";
import ErrorHTTP from "../../errors";
import { ServiceResponse } from "../../interfaces";

export default async function deleteVacancyService(
  description: string
): Promise<ServiceResponse> {
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);

  const vacancy = await vacanciesRepository.findOne({ where: { description } });

  if (!vacancy) throw new ErrorHTTP("Vacancy not found.");

  await vacanciesRepository.delete(vacancy);

  return {
    status: 200,
    response: "Vacancy deleted with success",
  };
}
