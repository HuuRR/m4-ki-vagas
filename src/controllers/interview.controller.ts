import { Request, Response } from "express";
import createIterviewService from "../services/interview/createInterview.service";
import listInterviewByUserService from "../services/interview/listInterviewsByUser.service";
import listInterviewByVacancyService from "../services/interview/listInterviewByVacancy.service";
import editIterviewService from "../services/interview/editIterview.service";
import deleteIterviewService from "../services/interview/deleteIterview.service";

export const createInterviewController = async (
  req: Request,
  res: Response
) => {
  const { hour, date, userId, vacancyId } = req.body;

  const newIterview = createIterviewService({ hour, date, userId, vacancyId });

  return res.status(201).json(newIterview);
};

export const listInterviewByUserController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  const listInterviews = listInterviewByUserService(userId);
  return res.status(200).json(listInterviews);
};

export const listIterviewByVacancyController = async (
  req: Request,
  res: Response
) => {
  const { vacancyId } = req.params;

  const listInterviews = listInterviewByVacancyService(vacancyId);
  return res.status(200).json(listInterviews);
};

export const editIterviewController = async (req: Request, res: Response) => {
  const { interviewId } = req.params;
  const { hour, date, isOver, feedback } = req.body;

  const interview = editIterviewService({
    interviewId,
    hour,
    date,
    isOver,
    feedback,
  });
  return res.status(201).json(interview);
};

export const deleteIterviewController = async (req: Request, res: Response) => {
  const { interviewId } = req.params;

  const interview = await deleteIterviewService(interviewId);

  return res.status(204).json({ message: "Interview deleted with success" });
};
