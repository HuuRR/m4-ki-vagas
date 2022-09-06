export interface ICreateUser {
    name: string,
    password: string,
    email: string,
    cpf: number,
    skills: {}
}

export interface IUpdateUser {
    name: string,
    password: string,
    email: string,
    cpf: number,
    id: string
}