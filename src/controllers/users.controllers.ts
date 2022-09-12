import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserByIdService from "../services/users/listUserById.service";
import listUsersService from "../services/users/listUsers.service";
import loginUserService from "../services/users/loginUser.service";
import updateUserService from "../services/users/updateUser.service";


export async function createUserController(request: Request, response: Response): Promise<void> {
    const { name, email, password, cpf, skills } = request.body;

    const user = await createUserService({name, email, password, cpf, skills});

    response.status(201).json(user);
};

export async function deleteUserController(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const message = await deleteUserService(id);

    response.status(200).json({ message });
};

export async function listUsersController(_request: Request, response: Response): Promise<void> {
    const users = await listUsersService();

    response.status(200).json(users);
};

export async function listUserByIdController(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const user = await listUserByIdService(id);

    response.status(200).json(user);
};

export async function updateUserController(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const { name, cpf, email, password, skills } = request.body;

    const user = await updateUserService({name, cpf, email, id, password, skills});

    response.status(200).json(user);
};

export async function loginUserController(request: Request, response: Response): Promise<void> {
    const { email, password, cpf } = request.body;

    const serviceResponse = await loginUserService({password, email, cpf});

    response.status(200).json(serviceResponse.response);
};