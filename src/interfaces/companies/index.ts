export interface ICompanyRequest {
    name: string,
    CNPJ: string,
    cidade_estado: string,
    qtde_funcionarios: string,
    email: string,
    password:string
}

export interface ICompany {
    id: string,
    name: string,
    CNPJ: string,
    cidade_estado: string,
    qtde_funcionarios: string,
    email: string,
    isActive:boolean,
    password:string,
    createdAt: Date,
    updatedAt: Date
}

export interface ICompanyLogin {
    email: string,
    password: string,
    CNPJ: string
}
