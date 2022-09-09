import { ICompanyRequest, ICompanyLogin } from "../../interfaces/companies";
import { IInterviewRequest } from "../../interfaces/interviews";
import { ICreateUser, ILoginUser } from "../../interfaces/users";
import { IVacancy } from "../../interfaces/vacancies";

export const mockedUser: ICreateUser = {
  cpf: "12345678900",
  email: "email@mail.com",
  name: "Usuario Criado",
  password: "1234",
  skills: {
    javascript: true,
    css: true,
    html: true,
  },
};

export const mockedInvalidCpfUser: ICreateUser = {
  cpf: "123456789123456",
  email: "email2@mail.com",
  name: "Usuario invalido",
  password: "123456",
  skills: {
    javascript: true,
    css: true,
    html: true,
  },
};

export const mockedUserLogin: ILoginUser = {
  email: "email@mail.com",
  password: "1234",
  cpf: "12345678900"
};


export const mockedCompany: ICompanyRequest = {
  cidade_estado: "CE",
  CNPJ: "12345678912345",
  email: "empresa@mail.com",
  name: "Empresa Criada",
  password: "1234",
  qtde_funcionarios: "5"
}

export const mockedInvalidCnpjCompany: ICompanyRequest = {
  cidade_estado: "CEmmnmn",
  CNPJ: "12345678912345462",
  email: "empresajjjjj@mail.com",
  name: "Empresa Criadajjjj",
  password: "12346516",
  qtde_funcionarios: "5"
}

export const mockedCompanyLogin: ICompanyLogin = {
  CNPJ: "12345678912345",
  email: "empresa@mail.com",
  password: "1234"
}

export const mockedInterview: IInterviewRequest = {
  date: "12/08/2022",
  hour: "12:00",
  userId: "XXXXXX-XXXXX-XXXXX",
  vacancyId: "XXXXXX-XXXXX-XXXXX"
}

export const mockedInvalidDateInterview: IInterviewRequest = {
  date: "1/08/2022",
  hour: "12:00",
  userId: "XXXXXX-XXXXX-XXXXX",
  vacancyId: "XXXXXX-XXXXX-XXXXX"
}

export const mockedInvalidHourInterview: IInterviewRequest = {
  date: "10/08/2022",
  hour: "5:00",
  userId: "XXXXXX-XXXXX-XXXXX",
  vacancyId: "XXXXXX-XXXXX-XXXXX"
}

export const mockedVacancy: IVacancy = {
  name: "Full Stack developer",
  salary: 1,
  description: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  companyId: "XXXXXXXXXXXXX",
  vacancy_skills: {
    javascript: true,
    css: true,
    html: true,
    react: true,
    docker: true,
    express: true
  }
}