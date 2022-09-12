import AppDataSource from "../../data-source";
import { Vacancies } from "../../entities/vacancies.entity";
import { AppError } from "../../errors/AppError";

const listVacancyByIdService = async (id: string): Promise<Vacancies> => {

    const vacanciesRepository = AppDataSource.getRepository(Vacancies);

    const vacancy = await vacanciesRepository.findOne({where: {id}});

    if (!vacancy) throw new AppError('Vacancy not found.', 404);

    return vacancy
};

export default listVacancyByIdService;