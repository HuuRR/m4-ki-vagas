import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";


const verifyOwnerAuth = (request: Request, _response: Response, next: NextFunction) => {
    const { id } = request.params;

    const { decoded: { id: tokenId } } = JSON.parse(request.headers.authorization!);

    if (id !== tokenId) throw new AppError('Date not found.', 404);

    next();
};

export default verifyOwnerAuth;