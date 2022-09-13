import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


const companyAuthMiddleware = async (req:Request, res:Response, next:NextFunction)  => {
    let token = fixBearerToken(req.headers.authorization);
    
    if(!token) return res.status(401).json({message:'Invalid Token.'});

    jwt.verify(token, process.env.SECRET_KEY_COMPANY as string, (error, decoded) => {
        
        if(error) return res.status(401).json({message: 'Invalid Token.'});

        req.headers.authorization = JSON.stringify({token, decoded});

        next();
    });
};

function fixBearerToken(token: string | undefined) {
    return token?.toLowerCase()?.includes("bearer") ? token?.split(" ")[1] : token;
};

export default companyAuthMiddleware;