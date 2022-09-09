import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedCompany, mockedCompanyLogin, mockedUser, mockedUserLogin, mockedVacancy } from "../../mocks";

describe("Testando rotas de interviwes", () => {
  let connection: DataSource;
  let userToken: string
  let companyToken: string
  let companyId: string

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /vacancies - Deve ser capaz de criar uma vaga", async () => {

    await request(app)
      .post("/users")
      .send(mockedUser);

    userToken = (await request(app)
      .post("/users/login")
      .send(mockedUserLogin)).body.token


    let createCompanyResponse = await request(app)
      .post("/company")
      .send(mockedCompany);

    companyToken = (await request(app)
      .post("/company/login")
      .send(mockedCompanyLogin)).body
    
    companyId = createCompanyResponse.body.id

    mockedVacancy.companyId = companyId

    let response = await request(app)
      .post("/vacancies")
      .send(mockedVacancy)
      .set("Authorization", `Bearer ${companyToken}`);
    
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("salary")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("skills")
    expect(response.body).not.toHaveProperty("companyId")
  })

  test("POST /vacancies - Não deve ser capaz de criar uma vaga sem token de empresa", async () => {
    let response = await request(app)
      .post("/vacancies")
      .send(mockedVacancy)
      .set("Authorization", `Bearer ${userToken}`);
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("POST /vacancies - Não deve ser capaz de criar uma vaga sem token", async () => {
    let response = await request(app)
      .post("/vacancies")
      .send(mockedVacancy);
    
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("GET /vacancies - Deve ser capaz de listar todas as vagas", async () => {})

  test("GET /vacancies/:id - Deve ser capaz de listar uma vaga especifica", async () => {})

  test("PATCH /vacancies/:id - Deve ser capaz de editar propriedade de uma vaga", async () => {})

  test("PATCH /vacancies/:id - Não deve ser capaz de editar propriedade de uma vaga sem token", async () => {})

  test("PATCH /vacancies/:id - Não deve ser capaz de editar propriedade de uma vaga sem token de empresa", async () => {})
  
  test("PATCH /vacancies/:id - Não deve ser capaz de editar propriedade de uma vaga com id incorreto", async () => {})

  test("DELETE /vacancies/:id - Não deve ser capaz de deletar uma vaga sem token", async () => {})

  test("DELETE /vacancies/:id - Não deve ser capaz de deletar uma vaga sem token de empresa", async () => {})

  test("DELETE /vacancies/:id - Não deve ser capaz de deletar uma vaga com token incorreto", async () => {})

  test("DELETE /vacancies/:id - Deve ser capaz de deletar uma vaga", async () => {})

});