import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors";
import { QueryFailedError } from "typeorm"


export default function errorHandlerMiddleware(error: any, _request: Request, response: Response, _: NextFunction) {

    if(error instanceof ErrorHTTP ) return response.status(error.statusCode).json({message: error.message})

    if (error instanceof QueryFailedError) {
        if (error.message.toLowerCase().includes("unique")) {
                return response.status(400).json({message: "Dados já existem!"})
        }
        else {
            console.log(error)
            return response.status(500).json({message: "Internal server error!"})
        }
    }

    console.log(error)
    return response.status(500).json({message: "Internal server error!"})
}