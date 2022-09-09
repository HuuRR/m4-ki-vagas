import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError"

export default async function verifyOwnerAuth(request: Request, _response: Response, next: NextFunction) {
    const { id } = request.params

    const { decoded: { id: tokenId } } = JSON.parse(request.headers.authorization!)

    if (id !== tokenId) throw new AppError('Usuário não é o dono', 401)

    next()
}