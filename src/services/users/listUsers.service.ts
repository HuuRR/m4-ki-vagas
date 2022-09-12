import AppDataSource from "../../data-source"
import User from "../../entities/users.entity"
import { instanceToPlain } from "class-transformer"

const listUsersService = async () => {

    const usersRepository = AppDataSource.getRepository(User);

    const users = await usersRepository.find();

    return instanceToPlain(users);
}

export default listUsersService;