export interface ICreateUser {
  name: string;
  password: string;
  email: string;
  cpf: string;
  skills: {};
}

export interface IUpdateUser {
  name: string;
  password: string;
  email: string;
  cpf: string;
  id: string;
  skills: {};
}
