import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IInterviewRequest } from "../../interfaces/interviews";
import { Interviews } from "../../entities/interviews.entity";
import User from "../../entities/users.entity";
import { Vacancies } from "../../entities/vacancies.entity";
import { instanceToPlain } from "class-transformer"

const createIterviewService = async ({
  hour,
  date,
  userId,
  vacancyId
}: IInterviewRequest) => {
  const interviewRepository = AppDataSource.getRepository(Interviews);
  const usersRepository = AppDataSource.getRepository(User);
  const vacancyRepository = AppDataSource.getRepository(Vacancies)

  const user = await usersRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const vacancy = await vacancyRepository.findOne({
      where: {
        id: vacancyId,
      },
    });

    if (!vacancy) {
      throw new AppError("Vacancy not found", 404);
    }

  let dateFormat = new Date(date);
  let days = dateFormat.getDay();

  if (days === 0 || days === 6) {
    throw new AppError("Invalid Date");
  }

  if (parseInt(hour) > 18 || parseInt(hour) < 8) {
    throw new AppError("Invalid hour");
  }

  const newInterview = new Interviews();
  newInterview.date = date;
  newInterview.hour = hour;
  newInterview.user = user;
  newInterview.vacancy = vacancy;

  interviewRepository.create(newInterview);
  await interviewRepository.save(newInterview);

  return instanceToPlain(newInterview);
};

export default createIterviewService;
