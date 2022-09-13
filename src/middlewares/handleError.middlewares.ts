
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";


const handleErrorMiddleware = async (error:Error, req: Request, res:Response, _next: NextFunction) => {
    if(error instanceof AppError) return res.status(error.statusCode).json({message: error.message});

    return res.status(500).json({ message: "Server internal Error." });
};

export default handleErrorMiddleware;