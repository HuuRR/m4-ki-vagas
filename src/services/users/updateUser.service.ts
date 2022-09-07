import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import ErrorHTTP from "../../errors";
import { ServiceResponse } from "../../interfaces";
import { IUpdateUser } from "../../interfaces/users";

export default async function updateUserService({name, cpf, email, id, password, skills}: IUpdateUser): Promise<ServiceResponse> {

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({where: {id}})

    if (!user) throw new ErrorHTTP('Usuario não encontrado')

    const userSkillsRepository = AppDataSource.getRepository(User) // repositorio de skills

    //await userSkillsRepository.update(user.skills, { ...skills })
    
    await usersRepository.update(id, {
        name: name || user.name,
        cpf: cpf || user.cpf,
        email: email || user.email,
        password: password || user.password
    })

    return {
        status: 200,
        response: user
    }
}