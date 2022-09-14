import AppDataSource from "../../data-source";
import { Company } from "../../entities/companies.entity";
import { ICompanyRequest } from "../../interfaces/companies";
import { hash } from "bcrypt";
import { AppError } from "../../errors/AppError";

const createCompanyService = async ({
  name,
  CNPJ,
  cidade_estado,
  qtde_funcionarios,
  email,
  password,
}: ICompanyRequest): Promise<Company> => {
  const companyRepository = AppDataSource.getRepository(Company);

  if(!name || !CNPJ || !cidade_estado || !qtde_funcionarios || !email || !password) {
    throw new AppError("All fields must be filled.  (name, CNPJ, cidade_estado, qtde_funcionarios, email and password).", 400)
  }

  if (CNPJ.length > 14) throw new AppError("Invalid CNPJ.");

  const company = await companyRepository.findOne({ where: { CNPJ } });

  if (company) throw new AppError("Company already exists.");

  const companyEmail = await companyRepository.findOne({ where: { email } });

  if (companyEmail) throw new AppError("Company already exists.");

  const companyName = await companyRepository.findOne({ where: { name } });

  if (companyName) throw new AppError("Company already exists.");

  const hashedPassword = await hash(password, 10);

  const newCompany = companyRepository.create({
    name,
    CNPJ,
    cidade_estado,
    qtde_funcionarios,
    email,
    password: hashedPassword,
  });

  await companyRepository.save(newCompany);

  return newCompany;
};

export default createCompanyService;
