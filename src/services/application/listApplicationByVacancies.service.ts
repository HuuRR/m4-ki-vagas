import AppDataSource from "../../data-source";
import { Applications } from "../../entities/applications.entity";
import { AppError } from "../../errors/AppError";

const listApplicationByVacanciesService = async (vacancyId: string) => {
  const applicationRepository = AppDataSource.getRepository(Applications);

  const applicationList = await applicationRepository.find();

  const applications = applicationList.filter(
    (application) => application.vacancy.id === vacancyId
  );

  if (applications.length === 0) throw new AppError("Vacancy Not Found.", 404);

  return applications;
};

export default listApplicationByVacanciesService;
