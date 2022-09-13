import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { ICreateUser } from "../../interfaces/users";
import { instanceToPlain } from "class-transformer"
import { User_skills } from "../../entities/user_skills.entity";
import { AppError } from "../../errors/AppError";
import * as bcrypt from "bcrypt"


const createUserService = async ({cpf, email, name, password, skills}: ICreateUser) => {

    if (cpf.toString().length > 11) throw new AppError('Invalid CPF.');

    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({where: {CPF: cpf}});

    if (user) throw new AppError('User already registered.');

    const userSkillsRepository = AppDataSource.getRepository(User_skills);

    const newUserSkills = userSkillsRepository.create({...skills});

    await userSkillsRepository.save(newUserSkills);

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = usersRepository.create({ CPF: cpf, email, name, password: hashedPassword, user_skills: newUserSkills});

    await usersRepository.save(newUser);

    return instanceToPlain(newUser);
};

export default createUserService;