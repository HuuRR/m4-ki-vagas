import { Request, Response } from "express";
import { ServiceResponse } from "../interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserByIdService from "../services/users/listUserById.service";
import listUsersService from "../services/users/listUsers.service";
import loginUserService from "../services/users/loginUser.service";
import updateUserService from "../services/users/updateUser.service";

export async function createUserController(request: Request, response: Response): Promise<void> {
    const { name, email, password, cpf, skills } = request.body

    const serviceResponse: ServiceResponse = await createUserService({name, email, password, cpf, skills})

    response.status(serviceResponse.status).json(serviceResponse.response)
}

export async function deleteUserController(request: Request, response: Response): Promise<void> {
    const { id } = request.params

    const serviceResponse: ServiceResponse = await deleteUserService(id)

    response.status(serviceResponse.status).json(serviceResponse.response)
}

export async function listUsersController(_request: Request, response: Response): Promise<void> {
    const serviceResponse: ServiceResponse = await listUsersService()

    response.status(serviceResponse.status).json(serviceResponse.response)
}

export async function listUserByIdController(request: Request, response: Response): Promise<void> {
    const { id } = request.params

    const serviceResponse: ServiceResponse = await listUserByIdService(id)

    response.status(serviceResponse.status).json(serviceResponse.response)
}

export async function updateUserController(request: Request, response: Response): Promise<void> {
    const { id } = request.params

    const { name, cpf, email, password, skills } = request.body

    const serviceResponse: ServiceResponse = await updateUserService({name, cpf, email, id, password, skills})

    response.status(serviceResponse.status).json(serviceResponse.response)
}

export async function loginUserController(request: Request, response: Response) {
    const { email, password, cpf } = request.body

    const serviceResponse: ServiceResponse = await loginUserService({password, email, cpf})

    response.status(serviceResponse.status).json(serviceResponse.response)
}