import { ICompanyRequest, ICompanyLogin } from "../../interfaces/companies";
import { ICreateUser, ILoginUser } from "../../interfaces/users";

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