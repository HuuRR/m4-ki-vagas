import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Interviews } from "../../entities/interviews.entity";

const deleteIterviewService = async (id: string) => {
  const interviewRepository = AppDataSource.getRepository(Interviews);

  const interview = await interviewRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!interview) {
    throw new AppError("Interview not found.", 404);
  }

  await interviewRepository.delete(interview!);

  return "Interview deleted with success.";
};
export default deleteIterviewService;
