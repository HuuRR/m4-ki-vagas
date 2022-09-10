import AppDataSource from "../../data-source";
import { Vacancies } from "../../entities/vacancies.entity";
import { AppError } from "../../errors/AppError";
import { ServiceResponse } from "../../interfaces";

export default async function listVacancyByIdService(id: string): Promise<ServiceResponse> {
    const vacanciesRepository = AppDataSource.getRepository(Vacancies)

    const vacancy = await vacanciesRepository.findOne({where: {id}})

    if (!vacancy) throw new AppError('Vacancy not found.')

    return {
        status: 200,
        response: vacancy
    }
}