import { Request, Response } from "express";
import createIterviewService from "../services/interview/createInterview.service";
import listInterviewByUserService from "../services/interview/listInterviewsByUser.service";
import listInterviewByVacancyService from "../services/interview/listInterviewByVacancy.service";
import editIterviewService from "../services/interview/editIterview.service";
import deleteIterviewService from "../services/interview/deleteIterview.service";


export const createInterviewController = async (request: Request, response: Response) => {
  const { hour, date, userId, vacancyId } = request.body;

  const newIterview = await createIterviewService({ hour, date, userId, vacancyId });

  return response.status(201).json(newIterview);
};

export const listInterviewByUserController = async (request: Request, response: Response) => {
  const { id } = request.params;

  const listInterviews = await listInterviewByUserService(id);
  return response.status(200).json(listInterviews);
};

export const listIterviewByVacancyController = async (request: Request, response: Response) => {
  const { id } = request.params;

  const listInterviews = await listInterviewByVacancyService(id);
  return response.status(200).json(listInterviews);
};

export const editIterviewController = async (request: Request, response: Response) => {
  const { id } = request.params;

  const { hour, date, isOver, feedback } = request.body;

  const interview = await editIterviewService({ id, hour, date, isOver, feedback });

  return response.status(200).json(interview);
};

export const deleteIterviewController = async (request: Request, response: Response) => {
  const { id } = request.params;

  const message = await deleteIterviewService(id);

  return response.status(200).json({ message });
};