import { Request, Response } from "express";
import { ServiceResponse } from "../interfaces";
import loginService from "../services/login/login.service";

export default async function loginController(request: Request, response: Response) {
    const { isUser, email, password } = request.body

    const serviceResponse: ServiceResponse = await loginService({isUser, password, email})

    response.status(serviceResponse.status).json(serviceResponse.response)
}