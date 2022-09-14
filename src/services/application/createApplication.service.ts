import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Applications } from "../../entities/applications.entity";
import User from "../../entities/users.entity";
import { Vacancies } from "../../entities/vacancies.entity";
import { AppError } from "../../errors/AppError";
import { IApplicationRequest } from "../../interfaces/application";

const createApplicationService = async ({ userId, vacancyId }: IApplicationRequest) => {
  const applicationRepository = AppDataSource.getRepository(Applications);

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId}});

  if (!user) throw new AppError("User not found", 404);

  const vacancyRepository = AppDataSource.getRepository(Vacancies);

  const vacancy = await vacancyRepository.findOne({ where: { id: vacancyId } });

  if (!vacancy) throw new AppError("Vacancy not found", 404);

  const newApplication = applicationRepository.create({
    user,
    vacancy
  });

  await applicationRepository.save(newApplication);

  return newApplication;
};

export default createApplicationService;
