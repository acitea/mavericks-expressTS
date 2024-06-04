import app from "../../app";
import request from "supertest";
import { db } from "../../dataSource";



const register = {
    "username" : "Testing User",
    "password" : 'abcd123',
    "employee" : 5
}


describe("POST /auth/register", () => {

    it('Creating a new user', async () => {
        const response = await request(app).post('/auth/register')
            .send(register)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body.message).toBe(
            "User registered successfully"
        );
    });

    it('Creating a new user with invalid data', async () => {
        const response = await request(app).post('/auth/register')
            .send({username: 'Testing User', password: '123456'})
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(404);
        expect(response.text).toContain("Illegal arguments")
    });

});

beforeAll(async () => {
    await db.initialize()
})

afterAll(async () => {
    await db.destroy()
})

describe("POST /auth/login", () => {

    const valid = {
        username : "HROnly",
        password : 'abcdef123'
    }

    

    it('Logging in with valid credentials', async () => {

        const response = await request(app).post('/auth/login')
            .send(valid)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

    });

    it('Logging in with invalid credentials', async () => {
        const response = await request(app).post('/auth/login')
            .send({username: 'HROnly', password: '123456'})
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            "Invalid username or password"
        );
    });

});
