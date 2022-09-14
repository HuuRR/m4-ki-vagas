import { Request, Response } from "express";
import createIterviewService from "../services/interview/createInterview.service";
import listInterviewByUserService from "../services/interview/listInterviewsByUser.service";
import listInterviewByVacancyService from "../services/interview/listInterviewByVacancy.service";
import editIterviewService from "../services/interview/editIterview.service";
import deleteIterviewService from "../services/interview/deleteIterview.service";
import AppDataSource from "../data-source";
import { Vacancies } from "../entities/vacancies.entity";
import { AppError } from "../errors/AppError";
import { Interviews } from "../entities/interviews.entity";

export const createInterviewController = async (
  request: Request,
  response: Response
) => {
  const { hour, date, userId, vacancyId } = request.body;

  const vacancyRepository = AppDataSource.getRepository(Vacancies);

  const thisvacancy = await vacancyRepository.findOne({
    where: { id: vacancyId },
  });

  if (!thisvacancy) {
    throw new AppError("Data not found.", 404);
  }

  const newIterview = await createIterviewService({
    hour,
    date,
    userId,
    vacancyId,
  });

  return response.status(201).json(newIterview);
};

export const listInterviewByUserController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const interviewRepository = AppDataSource.getRepository(Interviews);

  const thisInterview = await interviewRepository.findOne({
    where: { id: id },
  });

  if (!thisInterview) {
    throw new AppError("Data not found.", 404);
  }

  const listInterviews = await listInterviewByUserService(id);
  return response.status(200).json(listInterviews);
};

export const listIterviewByVacancyController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const interviewRepository = AppDataSource.getRepository(Interviews);

  const thisInterview = await interviewRepository.findOne({
    where: { id: id },
  });

  if (!thisInterview) {
    throw new AppError("Data not found.", 404);
  }

  const listInterviews = await listInterviewByVacancyService(id);
  return response.status(200).json(listInterviews);
};

export const editIterviewController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const interviewRepository = AppDataSource.getRepository(Interviews);

  const thisInterview = await interviewRepository.findOne({
    where: { id: id },
  });

  if (!thisInterview) {
    throw new AppError("Data not found.", 404);
  }

  const { hour, date, isOver, feedback } = request.body;

  const interview = await editIterviewService({
    id,
    hour,
    date,
    isOver,
    feedback,
  });

  return response.status(200).json(interview);
};

export const deleteIterviewController = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const interviewRepository = AppDataSource.getRepository(Interviews);

  const thisInterview = await interviewRepository.findOne({
    where: { id: id },
  });

  if (!thisInterview) {
    throw new AppError("Data not found.", 404);
  }

  const message = await deleteIterviewService(id);

  return response.status(200).json({ message });
};
