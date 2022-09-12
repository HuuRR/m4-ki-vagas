import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedCompany, mockedCompanyLogin, mockedUser, mockedUserLogin, mockedVacancy } from "../../mocks";

describe("Testando rotas de vacancies", () => {
  let connection: DataSource;
  let userToken: string
  let companyToken: string
  let companyId: string
  let vacancyId: string

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
      .send(mockedCompanyLogin)).body.token
    
    companyId = createCompanyResponse.body.id

    mockedVacancy.companyId = companyId

    let response = await request(app)
      .post("/vacancies")
      .send(mockedVacancy)
      .set("Authorization", `Bearer ${companyToken}`);

    vacancyId = response.body.id
        
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("salary")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("vacancy_skills")
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

  test("GET /vacancies - Deve ser capaz de listar todas as vagas", async () => {
    let response = await request(app)
      .get("/vacancies")

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  test("GET /vacancies/:id - Deve ser capaz de listar uma vaga especifica", async () => {
    let response = await request(app)
      .get(`/vacancies/${vacancyId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toHaveProperty("salary")
    expect(response.body).toHaveProperty("description")
    expect(response.body).toHaveProperty("vacancy_skills")
    expect(response.body).not.toHaveProperty("companyId")
  })

  test("PATCH /vacancies/:id - Deve ser capaz de editar propriedade de uma vaga", async () => {
    const response = await request(app)
      .patch(`/vacancies/${vacancyId}`)
      .send({
        name: "Vaga editada"
      })
      .set("Authorization", `Bearer ${companyToken}`);

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("name")
      expect(response.body).toHaveProperty("salary")
      expect(response.body).toHaveProperty("description")
      expect(response.body).toHaveProperty("vacancy_skills")
      expect(response.body.name).toEqual("Vaga editada")
  })

  test("PATCH /vacancies/:id - Não deve ser capaz de editar propriedade de uma vaga sem token", async () => {
    const response = await request(app)
    .patch(`/vacancies/${vacancyId}`)
    .send({
      name: "Vaga editada"
    });

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })

  test("PATCH /vacancies/:id - Não deve ser capaz de editar propriedade de uma vaga sem token de empresa", async () => {
    const response = await request(app)
      .patch(`/vacancies/${vacancyId}`)
      .send({
        name: "Vaga editada"
      })
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message")
  })
  
  test("PATCH /vacancies/:id - Não deve ser capaz de editar propriedade de uma vaga com id incorreto", async () => {
    const response = await request(app)
      .patch(`/vacancies/asca41wq-vqwv1qv-vwqv1q54-wvqv45qw`)
      .send({
        name: "Vaga editada"
      })
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })

  test("DELETE /vacancies/:id - Não deve ser capaz de deletar uma vaga sem token", async () => {
    const response = await request(app)
      .delete(`/vacancies/${vacancyId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  })

  test("DELETE /vacancies/:id - Não deve ser capaz de deletar uma vaga sem token de empresa", async () => {
    const response = await request(app)
      .delete(`/vacancies/${vacancyId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  })

  test("DELETE /vacancies/:id - Deve ser capaz de deletar uma vaga", async () => {
    const response = await request(app)
      .delete(`/vacancies/${vacancyId}`)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  })

});