import AppDataSource from "../../data-source"
import User from "../../entities/users.entity"
import ErrorHTTP from "../../errors"
import { ServiceResponse } from "../../interfaces"

export default async function deleteUserService(id: string): Promise<ServiceResponse> {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({where: {id}})

    if (!user) throw new ErrorHTTP('Usuario não encontrado')

    if (!user.isActive) throw new ErrorHTTP('Usuario já foi deletado', 406)

    await usersRepository.update(id, { isActive: false })

    return {
        status: 200,
        response: "Usuario deletado com sucesso"
    }
}