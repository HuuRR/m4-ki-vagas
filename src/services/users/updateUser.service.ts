import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { User_skills } from "../../entities/user_skills.entity";
import { AppError } from "../../errors/AppError";
import { IUpdateUser } from "../../interfaces/users";

const updateUserService = async ({
  name,
  cpf,
  email,
  id,
  password,
  skills,
}: IUpdateUser) => {
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOne({ where: { id } });

  if (!user) throw new AppError("User not found.");

  if (skills) {
    const userSkillsRepository = AppDataSource.getRepository(User_skills);

    await userSkillsRepository.update(user.user_skills.id, { ...skills });
  }

  await usersRepository.update(id, {
    name: name || user.name,
    CPF: cpf || user.CPF,
    email: email || user.email,
    password: password || user.password,
  });

  return await usersRepository.findOne({ where: { id } });
};

export default updateUserService;
