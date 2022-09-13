import AppDataSource from "../../data-source"
import { Company } from "../../entities/companies.entity"
import { ICompanyRequest } from "../../interfaces/companies"
import { hash } from "bcrypt"
import { AppError } from "../../errors/AppError"

const createCompanyService = async ({name, CNPJ, cidade_estado, qtde_funcionarios, email, password}: ICompanyRequest): Promise<Company> => {

    const companyRepository = AppDataSource.getRepository(Company);

    if(!CNPJ) throw new AppError("CNPJ not found.");

    if (CNPJ.length > 14) throw new AppError("Invalid CNPJ.");

    if(!password) throw new AppError("'Password' field must be filled.");

    const company = await companyRepository.findOne({where: {CNPJ}});

    if (company) throw new AppError("Company already exists.");

    const hashedPassword = await hash(password, 10);

    const newCompany = companyRepository.create({
        name, 
        CNPJ, 
        cidade_estado, 
        qtde_funcionarios, 
        email, 
        password: hashedPassword
    });
 
    await companyRepository.save(newCompany);

    return newCompany;
};

export default createCompanyService;