import AppDataSource from "../../data-source";
import { Vacancies } from "../../entities/vacancies.entity";
import { Vacancies_skills } from "../../entities/vacancies_skills.entity";
import { AppError } from "../../errors/AppError";
import { IVacancy } from "../../interfaces/vacancies";

const updateVacancyservice = async (
  id: string,
  { name, salary, description, vacancy_skills }: IVacancy
): Promise<Vacancies> => {
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);

  const vacancy = await vacanciesRepository.findOne({ where: { id } });

  if (!vacancy) throw new AppError("Vacancy Not Found.", 404);

  if (vacancy_skills) {
    const vacancySkillsRepository =
      AppDataSource.getRepository(Vacancies_skills);

    await vacancySkillsRepository.update(vacancy.vacancy_skills.id, {
      ...vacancy_skills,
    });
  }

  await vacanciesRepository.update(id, {
    name: name || vacancy.name,
    salary: salary || vacancy.salary,
    description: description || vacancy.description,
  });

  const updatedVacancy = await vacanciesRepository.findOne({ where: { id } });

  return updatedVacancy!;
};

export default updateVacancyservice;
