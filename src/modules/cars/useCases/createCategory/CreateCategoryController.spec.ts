import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../../../../shared/infra/http/app";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  // beforeAll ele não zera toda vez que executa um teste
  // beforeEaach reseta toda vez que vai passar por um teste
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
  values('${id}', 'admin', 'admin@email.com.br', '${password}', true, 'now()','XXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@email.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;



    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
     Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
   const responseToken = await request(app).post("/sessions").send({
     email: "admin@email.com.br",
     password: "admin",
   });

   const { token } = responseToken.body;



   const response = await request(app).post("/categories").send({
     name: "Category Supertest",
     description: "Category Supertest",
   }).set({
    Authorization: `Bearer ${token}`
   });

   expect(response.status).toBe(400);
 });
});
