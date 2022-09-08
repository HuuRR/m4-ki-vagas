import { hash } from "bcrypt"
import AppDataSource from "../../data-source"
import { Company } from "../../entities/companies.entity"
import { AppError } from "../../errors/AppError"
import { ICompanyRequest } from "../../interfaces/companies"

const updateCompanyService = async (idCompany:string,{name, cidade_estado, qtde_funcionarios, email, password}:ICompanyRequest) => {
    const companyRepository = AppDataSource.getRepository(Company)
    
    const company = await companyRepository.findOne({
        where:{
            id:idCompany
        }
    })
    if(!company?.isActive){
        throw new AppError("Empresa não encontrada",404)
    }
    await companyRepository.update(company.id, {
        name: name ? name : company.name,
        cidade_estado: cidade_estado ? cidade_estado : company.cidade_estado,
        qtde_funcionarios: qtde_funcionarios ? qtde_funcionarios :company.qtde_funcionarios,
        email: email ? email : company.email,
        password: password ? await hash(password, 10) : company.password,
        updatedAt: new Date()
     })
    
     const companyAlterada = await companyRepository.findOneBy({
        id:idCompany
    })

    return companyAlterada
}

export default updateCompanyService