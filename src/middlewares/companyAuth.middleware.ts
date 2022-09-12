import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const companyAuthMiddleware = async (req:Request, res:Response, next:NextFunction)  => {
    let token = req.headers.authorization
    
    if(!token){
        res.status(401).json({
            message:'Token inválido'
        })
    }

    const newToken = token!.split(' ')[1]

    jwt.verify(newToken, process.env.SECRET_KEY_COMPANY as string, (error, decoded) => {
        
        if(error) {
            return res.status(401).json({
                message: 'Token inválido'
            })
        }

        req.headers.authorization = JSON.stringify({token, decoded})
        next()
    })
}

export default companyAuthMiddleware
