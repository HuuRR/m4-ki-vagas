import AppDataSource from "../../data-source"
import User from "../../entities/users.entity"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { ILoginUser } from "../../interfaces/users"
import { AppError } from "../../errors/AppError"


const loginUserService = async ({password, email, cpf}: ILoginUser) => {

    const userRepository = AppDataSource.getRepository(User)
    
    const user = cpf ? await userRepository.findOne({where: {CPF: cpf}}) : await userRepository.findOne({where: {email}})
        
    if (!user) throw new AppError('Invalid Email/Password')

    if (!user.isActive) throw new AppError('This user is inactive.')

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) throw new AppError('Invalid Email/Password')

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY_PERSON as string, {expiresIn: '24h'})

    return {
        status: 200,
        response: {token, userId: user.id}
    }
}

export default loginUserService;