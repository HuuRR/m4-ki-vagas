import AppDataSource from "../../data-source";
import { Applications } from "../../entities/applications.entity";
import { Vacancies } from "../../entities/vacancies.entity";
import { AppError } from "../../errors/AppError";

const deleteVacancyService = async ( id: string ): Promise<string> => {

  const applicationRepository = AppDataSource.getRepository(Applications);
  
  const vacanciesRepository = AppDataSource.getRepository(Vacancies);
  
  const vacancy = await vacanciesRepository.findOne({ where: { id }});
  
  if (!vacancy) throw new AppError("Vacancy not found.", 404);

  const applications = await applicationRepository.find()

  if (applications) {
    for (const application of applications) {
      if (application.vacancy.id === id) await applicationRepository.delete(application.id)
    }
  }

  await vacanciesRepository.delete(vacancy);

  return "Vacancy deleted with success.";
};

export default deleteVacancyService;