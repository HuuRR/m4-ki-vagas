import AppDataSource from "../../data-source";
import { Vacancies } from "../../entities/vacancies.entity";
import { AppError } from "../../errors/AppError";

const deleteVacancyService = async ( id: string ): Promise<string> => {
  
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);

  const vacancy = await vacanciesRepository.findOne({ where: { id }});

  if (!vacancy) throw new AppError("Vacancy not found.", 404);

  await vacanciesRepository.delete(vacancy);

  return "Vacancy deleted with success.";
};

export default deleteVacancyService;