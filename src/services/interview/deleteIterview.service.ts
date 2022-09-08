import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Interviews } from "../../entities/iterviews.entity";

const deleteIterviewService = async (interviewId: string) => {
  const interviewRepository = AppDataSource.getRepository(Interviews);

  const interview = await interviewRepository.findOne({
    where: {
      id: interviewId,
    },
  });

  if (!interview) {
    throw new AppError("Interview not found", 404);
  }

  await interviewRepository.delete(interview!);

  return true;
};
export default deleteIterviewService;
