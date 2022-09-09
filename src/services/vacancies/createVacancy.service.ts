import AppDataSource from "../../data-source";
import { Company } from "../../entities/companies.entity";

import { Vacancies } from "../../entities/vacancies.entity";
import { AppError } from "../../errors/AppError";

import { IVacancy } from "../../interfaces/vacancies";

const createVacancyService = async ({
  name,
  salary,
  description,
}: IVacancy) => {
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);

  if (!name || !salary || !description) {
    throw new AppError(
      "All fields must be filled. (name, salary, description and company.)",
      400
    );
  }

  const vacancyAlreadyExists = await vacanciesRepository.findOneBy({
    description: description,
  });

  if (vacancyAlreadyExists) {
    throw new AppError("Vacancy already exists.", 400);
  }

  const vacancy = vacanciesRepository.create({
    name: name,
    salary: salary,
    description: description,
  });

  await vacanciesRepository.save(vacancy);

  return vacancy;
};

export default createVacancyService;
