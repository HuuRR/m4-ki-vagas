import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ServiceResponse } from "../../interfaces";

export default async function listUserByIdService(id: string): Promise<ServiceResponse> {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({where: {id}})

    if (!user) throw new AppError('Usuario não encontrado')

    return {
        status: 200,
        response: user
    }
}