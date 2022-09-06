import AppDataSource from "../../data-source"
import User from "../../entities/users.entity"
import { ServiceResponse } from "../../interfaces"
import { instanceToPlain } from "class-transformer"

export default async function listUsersService(): Promise<ServiceResponse> {

    const usersRepository = AppDataSource.getRepository(User)

    const users = await usersRepository.find()

    return {
        status: 200,
        response: instanceToPlain(users)
    }
}