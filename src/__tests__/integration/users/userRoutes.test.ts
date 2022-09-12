import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedInvalidCpfUser, mockedUser, mockedUserLogin } from "../../mocks";

describe("Testando rotas do usuario", () => {
  let connection: DataSource;
  let userId: string

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

  test("POST /users - Deve ser capaz de criar um usuário", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("user_skills");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("email");
    expect(response.body).not.toHaveProperty("id");
    expect(response.body).not.toHaveProperty("cpf");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Usuario Criado");
  });

  test("POST /users - Não deve ser capaz de criar um usuario com cpf invalido", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedInvalidCpfUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users - Não deve ser capaz de criar um usuario que já existe", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users - Deve ser capaz de listar todos os usuários", async () => {
    const response = await request(app).get("/users")

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).not.toHaveProperty("password");
    expect(response.body[0]).not.toHaveProperty("cpf");
    expect(response.body[0]).not.toHaveProperty("email");
  });

  test("GET /users/:id - Deve ser capaz de listar um usuário pelo id ", async () => {
    const loginResponse = await request(app).post("/users/login").send(mockedUserLogin);

    userId = loginResponse.body.userId

    const response = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("CPF");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
  });

  test("GET /users/:id - Não deve ser capaz de listar um usuário pelo id sem autorização ", async () => {
    const response = await request(app).get(`/users/${userId}`)

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users/:id - Não deve ser capaz de listar um usuário pelo id incorreto ", async () => {
    const loginResponse = await request(app).post("/users/login").send(mockedUserLogin);

    const response = await request(app)
      .get("/users/d6as5d6as5-ascas61-asc6sa1c5")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Deve ser capaz de atualizar propriedade do usuário", async () => {
    const loginResponse = await request(app).post("/users/login").send(mockedUserLogin);

    const response = await request(app)
      .patch(`/users/${userId}`)
      .send({
        name: "Usuário editado"
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("password");
      expect(response.body).toHaveProperty("CPF");
      expect(response.body).toHaveProperty("email");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toEqual("Usuário editado")
  });

  test("PATCH /users/:id - Não deve ser capaz de atualizar propriedade do usuário sem token", async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send({
        name: "Usuario editado"
      });

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty("message");
  });

  test("PATCH /users/:id - Não deve ser capaz de atualizar propriedade do usuário com id invalido", async () => {
    const loginResponse = await request(app).post("/users/login").send(mockedUserLogin);

    const response = await request(app)
      .patch("/users/va6s51v-afwq19v-vq8v41wq")
      .send({
        name: "Usuario editado"
      })
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Não deve ser capaz de deletar um usuário sem token", async () => {
    const response = await request(app).delete(`/users/${userId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Não deve ser capaz de deletar um usuário com id invalido", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete("/users/aa65a1cas-a6v5a1sv6-vas6vas1")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Deve ser capaz de deletar o usuário", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Não deve ser capaz de deletar um usuário que já foi deletado", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/users/login")
      .send(mockedUserLogin);

    expect(loginResponse.status).toBe(400);
    expect(loginResponse.body).toHaveProperty("message");
  });
});
