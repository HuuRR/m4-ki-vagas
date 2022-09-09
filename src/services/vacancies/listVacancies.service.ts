import AppDataSource from "../../data-source"
import { instanceToPlain } from "class-transformer"
import { Vacancies } from "../../entities/vacancies.entity"

export default async function listVacanciesService() {

    const vacanciesRepository = AppDataSource.getRepository(Vacancies)

    const vacancies = await vacanciesRepository.find()

    return {
        status: 200,
        response: instanceToPlain(vacancies)
    }
}