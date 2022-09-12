import AppDataSource from "../../data-source";
import { Company } from "../../entities/companies.entity";
import { AppError } from "../../errors/AppError";


const deleteCompanyService = async (idCompany: string) => {
  const companyRepository = AppDataSource.getRepository(Company);

  const company = await companyRepository.findOne({where: {id: idCompany}});

  if (!company?.isActive) throw new AppError("Empresa não encontrada", 404)

  await companyRepository.update(company.id, { isActive: false });

  return true;
};

export default deleteCompanyService;