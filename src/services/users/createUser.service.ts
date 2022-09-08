import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { ServiceResponse } from "../../interfaces";
import { ICreateUser } from "../../interfaces/users";
import { instanceToPlain } from "class-transformer"
import { User_skills } from "../../entities/user_skills.entity";

export default async function createUserService({cpf, email, name, password, skills}: ICreateUser): Promise<ServiceResponse> {

    const userSkillsRepository = AppDataSource.getRepository(User_skills)

    const newUserSkills = userSkillsRepository.create({...skills})

    await userSkillsRepository.save(newUserSkills)

    const usersRepository = AppDataSource.getRepository(User)

    const newUser = usersRepository.create({ CPF: cpf, email, name, password, user_skills: newUserSkills})

    await usersRepository.save(newUser)

    return {
        status: 201,
        response: instanceToPlain(newUser)
    }
}