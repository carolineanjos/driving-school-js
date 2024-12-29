const request = require('supertest');
const app = require('../index');  
const pool = require('../database');  

describe('Testes do endpoint /students', () => {
  let server;

  beforeAll(() => {
    process.env.PORT = 5001;
    server = app.listen(5001);  
  });

  afterAll(() => {
    server.close();  
    pool.end(); 
  });

  test("GET to /students should return 200", async () => {
    const response = await fetch("http://localhost:5000/students");
    expect(response.status).toBe(200);
  
    const responseBody = await response.json();
    console.log(responseBody);
  })

});
