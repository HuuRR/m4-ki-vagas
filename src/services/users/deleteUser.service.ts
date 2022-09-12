import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (id: string) => {
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({where: {id}});

    if (!user) throw new AppError('Usuario não encontrado');

    if (!user.isActive) throw new AppError('Usuario já foi deletado', 406);

    await usersRepository.update(id, { isActive: false });

    return "Usuario deletado com sucesso"
}

export default deleteUserService;