import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedCompany, mockedCompanyLogin, mockedInvalidCnpjCompany } from "../../mocks";

describe("Testando rotas de company", () => {
  let connection: DataSource;
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

  test("POST /company - Deve ser capaz de criar uma empresa", async () => {
    const response = await request(app)
      .post("/company")
      .send(mockedCompany);
    companyId = response.body.id

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("cidade_estado");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("CNPJ");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Empresa Criada");
  });

  test("POST /company - Não deve ser capaz de criar uma empresa com cnpj invalido", async () => {
    const response = await request(app)
      .post("/company")
      .send(mockedInvalidCnpjCompany);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /company - Não deve ser capaz de criar uma empresa que já existe", async () => {
    const response = await request(app)
      .post("/company")
      .send(mockedCompany);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  // test("GET /company - Deve ser capaz de listar todas as empresas", async () => {
  //   const response = await request(app).get("/company")

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveLength(1);
  //   expect(response.body[0]).not.toHaveProperty("password");
  //   expect(response.body[0]).not.toHaveProperty("cpf");
  //   expect(response.body[0]).not.toHaveProperty("email");
  // });

  test("GET /company/:id - Deve ser capaz de listar uma empresa pelo id ", async () => {
    const loginResponse = await request(app).post("/company/login").send(mockedCompanyLogin);

    const response = await request(app)
      .get(`/company/${companyId}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("CNPJ");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
  });

  test("GET /company/:id - Não deve ser capaz de listar uma empresa pelo id sem autorização ", async () => {
    const response = await request(app).get(`/company/${companyId}`)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message");
  });

  test("GET /company/:id - Não deve ser capaz de listar uma empresa pelo id incorreto ", async () => {
    const loginResponse = await request(app).post("/company/login").send(mockedCompanyLogin);

    const response = await request(app)
      .get("/company/d6as5d6as5-ascas61-asc6sa1c5")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /company/:id - Deve ser capaz de atualizar propriedade da empresa", async () => {
    const loginResponse = await request(app).post("/company/login").send(mockedCompanyLogin);

    const response = await request(app)
      .patch(`/company/${companyId}`)
      .send({
        name: "Empresa Editada"
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("password");
      expect(response.body).toHaveProperty("CNPJ");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toEqual("Empresa Editada")
  });

  test("PATCH /company/:id - Não deve ser capaz de atualizar propriedade da empresa sem token", async () => {
    const response = await request(app)
      .patch(`/company/${companyId}`)
      .send({
        name: "Empresa Editada"
      });

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty("message");
  });

  test("PATCH /company/:id - Não deve ser capaz de atualizar propriedade da empresa com id invalido", async () => {
    const loginResponse = await request(app).post("/company/login").send(mockedCompanyLogin);

    const response = await request(app)
      .patch("/company/va6s51v-afwq19v-vq8v41wq")
      .send({
        name: "Empresa Editada"
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty("message");
  });

  test("DELETE /company/:id - Não deve ser capaz de deletar uma empresa sem token", async () => {
    const response = await request(app).delete(`/company/${companyId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /company/:id - Não deve ser capaz de deletar uma empresa com id invalido", async () => {
    await request(app).post("/company").send(mockedCompany);

    const loginResponse = await request(app)
      .post("/company/login")
      .send(mockedCompanyLogin);

    const response = await request(app)
      .delete("/company/aa65a1cas-a6v5a1sv6-vas6vas1")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /company/:id - Deve ser capaz de deletar uma empresa", async () => {
    await request(app).post("/company").send(mockedCompany);

    const loginResponse = await request(app)
      .post("/company/login")
      .send(mockedCompanyLogin);

    const response = await request(app)
      .delete(`/company/${companyId}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /company/:id - Não deve ser capaz de deletar uma empresa que já foi deletado", async () => {
    await request(app).post("/company").send(mockedCompany);

    const loginResponse = await request(app)
      .post("/company/login")
      .send(mockedCompanyLogin);

    expect(loginResponse.status).toBe(400);
    expect(loginResponse.body).toHaveProperty("message");
  });
});
