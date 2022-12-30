const request = require('supertest');
const app = require('../app');
const db = require("../db");

describe('GET /', () => {
    it('should return an array of invoices', async () => {
      const res = await request(app).get('/invoices').expect(200);
  
      expect(res.body).toHaveProperty('invoices');
      expect(Array.isArray(res.body.invoices)).toBe(true);
      expect(res.body.invoices[0]).toHaveProperty('id');
      expect(res.body.invoices[0]).toHaveProperty('comp_code');
    });
});

describe("POST /", function () {

    test("It should add invoice", async function () {
      const response = await request(app)
          .post("/invoices")
          .send({amt: 400, comp_code: 'ibm'});
  
      expect(response.body).toEqual(
          {
            "invoice": {
              id: 7,
              comp_code: "ibm",
              amt: 400,
              add_date: expect.any(String),
              paid: false,
              paid_date: null,
            }
          }
      );
    });
  });