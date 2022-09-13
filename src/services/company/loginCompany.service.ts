import AppDataSource from "../../data-source";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "../../errors/AppError";
import { ICompanyLogin } from "../../interfaces/companies";
import { Company } from "../../entities/companies.entity";


const loginCompanyService = async ({ email, password }:ICompanyLogin): Promise<string> => {    
    const companyRepository = AppDataSource.getRepository(Company);

    const company = await companyRepository.findOne({ where: { email }});
    
    if(!company?.isActive) throw new AppError('Company not found.', 400);

    if(!company) throw new AppError('Invalid Email/Password.', 403);
    
    const matchPassword = await compare (password, company.password);
    
    if(!matchPassword) throw new AppError('Invalid Email/Password.',403);

    const token = jwt.sign({ }, process.env.SECRET_KEY_COMPANY as string, 
      {
        subject:company.id,
        expiresIn:'2h'
      },
    );

    return token;
};

export default loginCompanyService;