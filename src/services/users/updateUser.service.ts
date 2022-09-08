import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { User_skills } from "../../entities/user_skills.entity";
import { AppError } from "../../errors/AppError";
import { ServiceResponse } from "../../interfaces";
import { IUpdateUser } from "../../interfaces/users";

export default async function updateUserService({name, cpf, email, id, password, skills}: IUpdateUser): Promise<ServiceResponse> {

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOne({where: {id}})

    if (!user) throw new AppError('Usuario não encontrado')

    if (skills) {
        const userSkillsRepository = AppDataSource.getRepository(User_skills)
    
        await userSkillsRepository.update(user.user_skills.id, { ...skills })
    }
    
    await usersRepository.update(id, {
        name: name || user.name,
        CPF: cpf || user.CPF,
        email: email || user.email,
        password: password || user.password
    })

    return {
        status: 200,
        response: await usersRepository.findOne({where: {id}})
    }
}