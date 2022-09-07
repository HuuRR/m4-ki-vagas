import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError"

const handleErrorMiddleware = async (error:Error, req: Request, res:Response, next: NextFunction) => {
if(error instanceof AppError){
    return res.status(error.statusCode).json({
        message:error.message
    })
}
return res.status(400).json({
    message: "Erro interno no servidor"
})

}

export default handleErrorMiddleware