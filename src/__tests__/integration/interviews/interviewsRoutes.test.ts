import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedCompany, mockedCompanyLogin, mockedInterview, mockedInvalidDateInterview, mockedInvalidHourInterview, mockedUser, mockedUserLogin, mockedVacancy } from "../../mocks";

describe("Testando rotas de interviwes", () => {
  let connection: DataSource;
  let userId: string
  let companyId: string
  let vacancyId: string
  let userToken: string
  let companyToken: string

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

  test("POST /interviews - Deve ser capaz de criar uma entrevista", async () => {
    await request(app)
      .post("/users")
      .send(mockedUser);

    let createUserResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin)

    userToken = createUserResponse.body.token
    userId = createUserResponse.body.userId

    let createCompanyResponse = await request(app)
      .post("/company")
      .send(mockedCompany);

    companyToken = (await request(app)
      .post("/company/login")
      .send(mockedCompanyLogin)).body.token
    
    companyId = createCompanyResponse.body.id

    mockedVacancy.companyId = companyId

    const createVacancyResponse = await request(app)
      .post("/vacancies")
      .send(mockedVacancy)
      .set("Authorization", `Bearer ${companyToken}`);

    vacancyId = createVacancyResponse.body.id

    mockedInterview.vacancyId = vacancyId
    mockedInterview.userId = userId

    mockedInvalidDateInterview.vacancyId = vacancyId
    mockedInvalidDateInterview.userId = userId

    mockedInvalidHourInterview.vacancyId = vacancyId
    mockedInvalidHourInterview.userId = userId

    const response = await request(app)
      .post("/interviews")
      .send(mockedInterview)
        
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("hour")
    expect(response.body).toHaveProperty("date")
    expect(response.body).toHaveProperty("isOver")
    expect(response.body).toHaveProperty("feedback")
  })

  test("POST /interviews - Não deve ser capaz de criar uma entrevista com a data errada", async () => {
    const response = await request(app)
      .post("/interviews")
      .send(mockedInvalidDateInterview)
    
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  test("POST /interviews - Não deve ser capaz de criar uma entrevista com a hora errada", async () => {
    const response = await request(app)
      .post("/interviews")
      .send(mockedInvalidHourInterview)
    
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })

  test("GET /interviews/user/:id - Deve ser capaz de listar todas as entrevistas de um usuário", async () => {})

  // test("GET /interviews/user/:id - Não deve ser capaz de listar todas as entrevistas de um usuário sem token", async () => {})

  test("GET /interviews/user/:id - Não deve ser capaz de listar todas as entrevistas de um usuário com id invalido", async () => {})

  test("GET /interviews/vacancy/:id - Deve ser capaz de listar todas as entrevistas de uma vaga", async () => {})

  // test("GET /interviews/vacancy/:id - Não deve ser capaz de listar todas as entrevistas de uma vaga sem token", async () => {})

  test("GET /interviews/vacancy/:id - Não deve ser capaz de listar todas as entrevistas de uma vaga com id invalido", async () => {})

  test("PATCH /interviews/:id - Deve ser capaz de alterar propriedade da entrevista", async () => {})

  test("PATCH /interviews/:id - Não deve ser capaz de alterar propriedade da entrevista sem token", async () => {})

  test("PATCH /interviews/:id - Não deve ser capaz de alterar propriedade da entrevista com id inválido", async () => {})

  test("DELETE /interviews/:id - Não deve ser capaz de deletar entrevista sem token", async () => {})

  test("DELETE /interviews/:id - Não deve ser capaz de deletar entrevista com id invalido", async () => {})

  test("DELETE /interviews/:id - Deve ser capaz de deletar entrevista", async () => {})


});