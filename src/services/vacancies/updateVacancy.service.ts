import AppDataSource from "../../data-source";
import { Vacancies } from "../../entities/vacancies.entity";
import ErrorHTTP from "../../errors";
import { ServiceResponse } from "../../interfaces";
import { IVacancy } from "../../interfaces/vacancies";

export default async function updateVacancyservice({
  name,
  salary,
  description,
}: IVacancy): Promise<ServiceResponse> {
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);

  const vacancy = await vacanciesRepository.findOne({ where: { description } });

  if (!vacancy) throw new ErrorHTTP("Vacancy Not Found.");

  await vacanciesRepository.update(description, {
    name: name || vacancy.name,
    salary: salary || vacancy.salary,
    description: description || vacancy.description,
  });

  return {
    status: 200,
    response: vacancy,
  };
}