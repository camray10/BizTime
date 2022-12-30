const request = require('supertest');
const app = require('../app');
const db = require("../db");

describe('GET /:code', () => {
    it('should return a company object when a valid code is provided', async () => {
      const res = await request(app).get('/companies/ibm').expect(200);
  
      expect(res.body).toHaveProperty('company');
      expect(res.body.company).toHaveProperty('code', 'ibm');
      expect(res.body.company).toHaveProperty('name');
      expect(res.body.company).toHaveProperty('description');
    });
});

describe("POST /", function () {

  test("It should add company", async function () {
    const response = await request(app).post("/companies").send({code: "tacotime", name: "TacoTime", description: "Yum!"});

    expect(response.body).toEqual(
        {
          "company": {
            code: "tacotime",
            name: "TacoTime",
            description: "Yum!",
          }
        }
    );
  });
});

describe("DELETE /", function () {

  test("It should delete company", async function () {
    const response = await request(app)
        .delete("/companies/tacotime");

    expect(response.body).toEqual({"status": "deleted"});
  });
});