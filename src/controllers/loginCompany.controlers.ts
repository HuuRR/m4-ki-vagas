import { Request, Response } from "express"
import { ICompanyLogin } from "../interfaces/companies"
import loginCompanyService from "../services/company/loginCompany.service"

const loginCompanyControllers = async (req:Request, res:Response)  => {
    const { email, password }: ICompanyLogin = req.body
    const token = await loginCompanyService({ email, password })
    return res.json({token})
}

export default loginCompanyControllers