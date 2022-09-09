import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Interviews } from "../../entities/iterviews.entity";

const listInterviewByUserService = async (userId: string) => {
  const interviewRepository = AppDataSource.getRepository(Interviews);

  const iterviewsList = await interviewRepository.find();

  const iterviews = iterviewsList.filter(
    (iterview) => iterview.user.id === userId
  );

  if (iterviews.length === 0) {
    throw new AppError("User not found", 404);
  }

  return iterviews;
};

export default listInterviewByUserService;
