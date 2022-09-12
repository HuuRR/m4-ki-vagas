import AppDataSource from "../../data-source"
import User from "../../entities/users.entity"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { ServiceResponse } from "../../interfaces"
import { ILoginUser } from "../../interfaces/users"
import { AppError } from "../../errors/AppError"


export default async function loginUserService({password, email, cpf}: ILoginUser): Promise<ServiceResponse> {

    const userRepository = AppDataSource.getRepository(User)
    
    const user = cpf ? await userRepository.findOne({where: {cpf: cpf}}) : await userRepository.findOne({where: {email}})
        
    if (!user) throw new AppError('Senha ou email invalidos')

    if (!user.isActive) throw new AppError('Usuário está inativo')

    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) throw new AppError('Senha ou email invalidos')

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY_PERSON as string, {expiresIn: '24h'})

    return {
        status: 200,
        response: {token, userId: user.id}
    }
}