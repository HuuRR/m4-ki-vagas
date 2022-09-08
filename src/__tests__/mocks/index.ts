import { ICreateUser, ILoginUser } from "../../interfaces/users";

export const mockedUser: ICreateUser = {
  cpf: 12345678900,
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
  cpf: 123456789123456,
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
  cpf: 12345678900
};
