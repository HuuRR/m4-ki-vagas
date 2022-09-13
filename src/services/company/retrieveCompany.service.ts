import AppDataSource from "../../data-source";
import { Company } from "../../entities/companies.entity";
import { AppError } from "../../errors/AppError";


const retrieveCompanyService = async (idCompany:string) => {
    const companyRepository = AppDataSource.getRepository(Company);

    const company = await companyRepository.findOne({where: {id: idCompany}});

    if (!company) throw new AppError("Company not found.", 404);

    return company;
};

export default retrieveCompanyService;