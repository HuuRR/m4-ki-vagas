import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import {
  mockedCompany,
  mockedCompanyLogin,
  mockedInterview,
  mockedInvalidDateInterview,
  mockedInvalidHourInterview,
  mockedUser,
  mockedUserLogin,
  mockedVacancy,
} from "../../mocks";

describe("Testando rotas de entrevistas", () => {
  let connection: DataSource;
  let userId: string;
  let companyId: string;
  let vacancyId: string;
  let interviewId: string;
  let userToken: string;
  let companyToken: string;

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
    await request(app).post("/users").send(mockedUser);

    let createUserResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    userToken = createUserResponse.body.token;
    userId = createUserResponse.body.userId;

    let createCompanyResponse = await request(app)
      .post("/company")
      .send(mockedCompany);

    companyToken = (
      await request(app).post("/company/login").send(mockedCompanyLogin)
    ).body.token;

    companyId = createCompanyResponse.body.id;

    mockedVacancy.companyId = companyId;

    const createVacancyResponse = await request(app)
      .post("/vacancies")
      .send(mockedVacancy)
      .set("Authorization", `Bearer ${companyToken}`);

    vacancyId = createVacancyResponse.body.id;

    mockedInterview.vacancyId = vacancyId;
    mockedInterview.userId = userId;

    mockedInvalidDateInterview.vacancyId = vacancyId;
    mockedInvalidDateInterview.userId = userId;

    mockedInvalidHourInterview.vacancyId = vacancyId;
    mockedInvalidHourInterview.userId = userId;

    const response = await request(app)
      .post("/interviews")
      .send(mockedInterview)
      .set("Authorization", `Bearer ${companyToken}`);

    interviewId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("isOver");
    expect(response.body).toHaveProperty("feedback");
  });

  test("POST /interviews - Não deve ser capaz de criar uma entrevista com a data errada", async () => {
    const response = await request(app)
      .post("/interviews")
      .send(mockedInvalidDateInterview)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /interviews - Não deve ser capaz de criar uma entrevista com a hora errada", async () => {
    const response = await request(app)
      .post("/interviews")
      .send(mockedInvalidHourInterview)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /interviews/user/:id - Deve ser capaz de listar todas as entrevistas de um usuário", async () => {
    const response = await request(app)
      .get(`/interviews/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /interviews/user/:id - Não deve ser capaz de listar todas as entrevistas de um usuário sem token de usuario", async () => {
    const response = await request(app)
      .get(`/interviews/user/${userId}`)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /interviews/user/:id - Não deve ser capaz de listar todas as entrevistas de um usuário com id invalido", async () => {
    const response = await request(app)
      .get(`/interviews/user/${companyId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /interviews/vacancy/:id - Deve ser capaz de listar todas as entrevistas de uma vaga", async () => {
    const response = await request(app)
      .get(`/interviews/vacancy/${vacancyId}`)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /interviews/vacancy/:id - Não deve ser capaz de listar todas as entrevistas de uma vaga sem token de empresa", async () => {
    const response = await request(app)
      .get(`/interviews/vacancy/${vacancyId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /interviews/vacancy/:id - Não deve ser capaz de listar todas as entrevistas de uma vaga com id invalido", async () => {
    const response = await request(app)
      .get(`/interviews/vacancy/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /interviews/:id - Deve ser capaz de alterar propriedade da entrevista", async () => {
    const response = await request(app)
      .patch(`/interviews/${interviewId}`)
      .send({
        feedback: "Feedback adicionado",
      })
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(200);
    expect(response.body.feedback).toEqual("Feedback adicionado");
  });

  test("PATCH /interviews/:id - Não deve ser capaz de alterar propriedade da entrevista sem token", async () => {
    const response = await request(app)
      .patch(`/interviews/${interviewId}`)
      .send({
        feedback: "Feedback adicionado",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /interviews/:id - Não deve ser capaz de alterar propriedade da entrevista com id inválido", async () => {
    const response = await request(app)
      .patch(`/interviews/${userId}`)
      .send({
        feedback: "Feedback adicionado",
      })
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /interviews/:id - Não deve ser capaz de deletar entrevista sem token", async () => {
    const response = await request(app).delete(
      `/interviews/avsavas45va-vasv614-vasv41-avsvq4vwq`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /interviews/:id - Não deve ser capaz de deletar entrevista com id invalido", async () => {
    const response = await request(app)
      .delete(`/interviews/avsavas45va-vasv614-vasv41-avsvq4vwq`)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /interviews/:id - Deve ser capaz de deletar entrevista", async () => {
    const response = await request(app)
      .delete(`/interviews/${interviewId}`)
      .set("Authorization", `Bearer ${companyToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
