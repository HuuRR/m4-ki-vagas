import AppDataSource from "../../data-source";
import { Company } from "../../entities/companies.entity";
import { Vacancies } from "../../entities/vacancies.entity";
import { Vacancies_skills } from "../../entities/vacancies_skills.entity";
import { AppError } from "../../errors/AppError";
import { IVacancy } from "../../interfaces/vacancies";

const createVacancyService = async ({
  name,
  salary,
  description,
  companyId,
  vacancy_skills,
}: IVacancy): Promise<Vacancies> => {
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);

  if (!name || !salary || !description) {
    throw new AppError(
      "All fields must be filled. (name, salary, description and company.)",
      400
    );
  }

  const vacancyAlreadyExists = await vacanciesRepository.findOne({
    where: {
      description,
      name,
      salary,
      vacancy_skills,
    },
  });

  if (vacancyAlreadyExists)
    throw new AppError("Vacancy already registered.", 400);

  const vacancySkillsRepository = AppDataSource.getRepository(Vacancies_skills);

  const newVacancySkills = vacancySkillsRepository.create({
    ...vacancy_skills,
  });

  await vacancySkillsRepository.save(newVacancySkills);

  const companyRepository = AppDataSource.getRepository(Company);

  const company = await companyRepository.findOne({ where: { id: companyId } });

  if (!company) throw new AppError("Company not found.", 404);

  const vacancy = vacanciesRepository.create({
    name,
    salary,
    description,
    company,
    vacancy_skills: newVacancySkills,
  });

  await vacanciesRepository.save(vacancy);

  return vacancy;
};

export default createVacancyService;
