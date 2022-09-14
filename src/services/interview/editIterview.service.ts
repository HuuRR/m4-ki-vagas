import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Interviews } from "../../entities/interviews.entity";
import { IInterview } from "../../interfaces/interviews";


const editIterviewService = async ({ id, hour, date, isOver, feedback}: IInterview) => {
  
  if(!id || !hour || !date || !isOver || !feedback){
    throw new AppError("All fields must be filled. (id, hour, date, isOver and feedback).", 400)
  }

  const interviewRepository = AppDataSource.getRepository(Interviews);

  const interview = await interviewRepository.findOne({ where: {id}});

  if (!interview) throw new AppError("Interview not found.", 404);

  let dateFormat = new Date(date);

  let days = dateFormat.getDay();

  if (days === 0 || days === 6) throw new AppError("Invalid Date. (must be like 2012/10/12 for example", 400);

  if (parseInt(hour) > 18 || parseInt(hour) < 8) throw new AppError("Invalid hour. Must be like 10:00 for example.", 400);

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