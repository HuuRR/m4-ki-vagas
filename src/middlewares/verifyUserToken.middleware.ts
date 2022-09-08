import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";


export default async function verifyUserToken(request: Request, _response: Response, next: NextFunction) {
    const { decoded: { isPerson } } = JSON.parse(request.headers.authorization!)

    if (!isPerson) throw new AppError("Usuário não tem autorização de empresa")

    next()
}