import AppDataSource from "../../data-source"
import { instanceToPlain } from "class-transformer"
import { Vacancies } from "../../entities/vacancies.entity"

const listVacanciesService = async () => {

    const vacanciesRepository = AppDataSource.getRepository(Vacancies);

    const vacancies = await vacanciesRepository.find();

    return instanceToPlain(vacancies);
};

export default listVacanciesService;