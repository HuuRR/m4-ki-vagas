import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import User from "../../entities/users.entity";


const listInterviewByUserService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOne({ where: {id}});

  if (!user) throw new AppError("User not found.", 404);

  return user.interviews;
};

export default listInterviewByUserService;