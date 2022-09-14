export interface ICreateUser {
  name: string;
  password: string;
  email: string;
  cpf: string;
  skills: IUserSkills;
};

export interface IUpdateUser {
  name: string;
  password: string;
  email: string;
  cpf: string;
  id: string;
  skills: IUserSkills;
};

export interface ILoginUser {
  password: string;
  email: string;
  cpf: string;
};

export interface IUserSkills {
  excel?: boolean;
  javascript?: boolean;
  react?: boolean;
  css?: boolean;
  html?: boolean;
  express?: boolean;
  docker?: boolean;
};