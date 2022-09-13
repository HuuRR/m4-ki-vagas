import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Interviews } from "../../entities/interviews.entity";
import { IInterview } from "../../interfaces/interviews";


const editIterviewService = async ({ id, hour, date, isOver, feedback}: IInterview) => {
  const interviewRepository = AppDataSource.getRepository(Interviews);

  const interview = await interviewRepository.findOne({ where: {id}});

  if (!interview) throw new AppError("Interview not found.", 404);

  let dateFormat = new Date(date);

  let days = dateFormat.getDay();

  if (days === 0 || days === 6) throw new AppError("Invalid Date.");

  if (parseInt(hour) > 18 || parseInt(hour) < 8) throw new AppError("Invalid hour.");

  await interviewRepository.update(interview.id, {
    date: date || interview.date,
    hour: hour || interview.hour,
    isOver: isOver || interview.isOver,
    feedback: feedback || interview.feedback,
  });

  const updatedInterview = await interviewRepository.findOneBy({id});

  return updatedInterview;
};

export default editIterviewService;