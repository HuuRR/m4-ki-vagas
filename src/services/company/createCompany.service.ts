import AppDataSource from "../../data-source"
import { v4 as uuidv4 } from "uuid"
import { Company } from "../../entities/companies.entity"
import { ICompanyRequest } from "../../interfaces/companies"
import { hash } from "bcrypt"
import { AppError } from "../../errors/AppError"

const createCompanyService =  async ({name, CNPJ, cidade_estado, qtde_funcionarios, email, password}:ICompanyRequest): Promise<Company> => {

    const companyRepository = AppDataSource.getRepository(Company)

    if(!CNPJ){
        throw new AppError("CNPJ não informado")
    }

    if (CNPJ.length > 14) throw new AppError("CNPJ invalido")

    if(!password){
        throw new AppError("Senha não informada")
    }

    const hashedPassword = await hash(password,10)

    const newCompany = companyRepository.create({
        id: uuidv4(),
        name, 
        CNPJ, 
        cidade_estado, 
        qtde_funcionarios, 
        email, 
        isActive: true,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    
    await companyRepository.save(newCompany)

    return(newCompany)
}

export default createCompanyService