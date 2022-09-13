import AppDataSource from "../../data-source";
import User from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const listUserByIdService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOne({ where: { id } });

  if (!user) throw new AppError("User not found.");

  return user;
};

export default listUserByIdService;
