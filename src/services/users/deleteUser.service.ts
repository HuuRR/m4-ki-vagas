import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (id: string) => {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({where: {id}});

    if (!user) throw new AppError('User not found.');

    if (!user.isActive) throw new AppError('User already deleted.', 406);

    await usersRepository.update(id, { isActive: false });

    return "User deleted with success."
}

export default deleteUserService;