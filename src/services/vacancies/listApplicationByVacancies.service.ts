import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const listApplicationByVacanciesService = async(vacancyId: string) Promise<Application>=>{
    const applicationRepository = AppDataSource.getRepository(Application);
    
    const applicationList = await applicationRepository.find();

    const applications = applicationList.filter((application) => application.vacancy.id === vacancyId);

  if (applications.length === 0) throw new AppError("Vacancy Not Found.", 404);

  return applications


}

export default listApplicationByVacanciesService