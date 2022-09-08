import { DataSource } from "typeorm";
import request from "supertest";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedInvalidCpfUser, mockedUser, mockedUserLogin } from "../../mocks";

describe("Testando rotas do usuario", () => {
  let connection: DataSource;

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
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("skills");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Usuario Criado");
    expect(response.body.email).toEqual("email@mail.com");
  });

  test("POST /users - Não deve ser capaz de criar um usuario com cpf invalido", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedInvalidCpfUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /users - Não deve ser capaz de criar um usuario que já existe", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /users - Deve ser capaz de listar todos os usuários", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).toHaveProperty("map");
  });

  test("GET /users/:id - Deve ser capaz de listar um usuário pelo id ", async () => {});

  test("GET /users/:id - Não deve ser capaz de listar um usuário pelo id sem autorização ", async () => {});

  test("GET /users/:id - Não deve ser capaz de listar um usuário pelo id incorreto ", async () => {});

  test("PATCH /users/:id - Deve ser capaz de atualizar propriedade do usuário", async () => {});

  test("PATCH /users/:id - Não deve ser capaz de atualizar propriedade do usuário sem token", async () => {});

  test("PATCH /users/:id - Não deve ser capaz de atualizar propriedade do usuário com id invalido", async () => {});

  test("DELETE /users/:id - Não deve ser capaz de deletar um usuário sem token", async () => {
    const loginResponse = await request(app).post("/login").send(mockedUser);
    const userToDelete = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${userToDelete.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id - Não deve ser capaz de deletar um usuário com id invalido", async () => {});

  test("DELETE /users/:id - Deve ser capaz de deletar o usuário", async () => {
    await request(app).post("/users").send(mockedUser);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);

    const response = await request(app)
      .delete(`/users/${loginResponse.body[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users/:id - Não deve ser capaz de deletar um usuário que já foi deletado", async () => {});
});
