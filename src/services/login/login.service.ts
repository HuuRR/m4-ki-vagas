import AppDataSource from "../../data-source"
import User from "../../entities/users.entity"
import ErrorHTTP from "../../errors"
import { ILogin } from "../../interfaces/login"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { ServiceResponse } from "../../interfaces"


export default async function loginService({password, isUser, email}: ILogin): Promise<ServiceResponse> {

    const entityClass = isUser ? User : User

    const entityRepository = AppDataSource.getRepository(entityClass)

    const entity = await entityRepository.findOne({where: {email}})

    if (!entity) throw new ErrorHTTP('Senha ou email invalidos')

    const passwordMatch = bcrypt.compareSync(password, entity.password)

    if (!passwordMatch) throw new ErrorHTTP('Senha ou email invalidos')

    const token = jwt.sign({ id: entity.id, email: entity.email }, process.env.SECRET_KEY as string, {expiresIn: '24h'})

    return {
        status: 200,
        response: token
    }
}