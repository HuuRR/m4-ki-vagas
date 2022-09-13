import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";


const verifyPersonAuthToken = (request: Request, _response: Response, next: NextFunction) => {
    const token = fixBearerToken(request.headers.authorization);

    if (!token) throw new AppError("Authorization token not found.", 401);

    jwt.verify(token, process.env.SECRET_KEY_PERSON as string, (error, decoded) => {
        if (error) throw new AppError("Invalid Token", 401);
        
        request.headers.authorization = JSON.stringify({token, decoded});

        next();
    });
};

function fixBearerToken(token: string | undefined) {
    return token?.toLowerCase()?.includes("bearer") ? token?.split(" ")[1] : token;
};

export default verifyPersonAuthToken;