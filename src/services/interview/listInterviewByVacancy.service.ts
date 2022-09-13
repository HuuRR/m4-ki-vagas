import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Interviews } from "../../entities/interviews.entity";


const listInterviewByVacancyService = async (vacancyId: string) => {
  const interviewRepository = AppDataSource.getRepository(Interviews);

  const iterviewsList = await interviewRepository.find();

  const iterviews = iterviewsList.filter((iterview) => iterview.vacancy.id === vacancyId);

  if (iterviews.length === 0) throw new AppError("Vacancy not found.", 404);

  return iterviews;
};

export default listInterviewByVacancyService;