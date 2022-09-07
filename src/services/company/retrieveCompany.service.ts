import AppDataSource from "../../data-source"
import { Company } from "../../entities/companies.entity"

const retrieveCompanyService = async (idCompany:string) => {
    const companyRepository = AppDataSource.getRepository(Company)
    const companies = await companyRepository.find()
    
    const company = companies.find(company => company.id === idCompany)
    
    return company
}

export default retrieveCompanyService