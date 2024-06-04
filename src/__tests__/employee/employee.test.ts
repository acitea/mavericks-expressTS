import app from "../../app";
import request from "supertest";
import { db } from "../../dataSource";

const valid = {
    username : "HROnly",
    password : 'abcdef123'
}

describe("GET /employee", () => {

    let token = '';

    beforeAll(async () => {
        await db.initialize()
        const response = await request(app).post('/auth/login')
            .send(valid)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        token = response.body.token;
    });

    afterAll(async () => {
        await db.destroy();
    });


    it('Getting all employees, paginated by default', async () => {
        const response = await request(app).get('/employee')
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(10);
        expect(response.body.meta.limit).toBe(10);
        expect(response.body.meta.currentPage).toBe(1); 
    });

    it('Getting employees on page 3, default limit', async () => {
        const response = await request(app).get('/employee?page=3')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.meta.limit).toBe(10);
        expect(response.body.meta.currentPage).toBe(3); 
    });


    it('Getting employees on page 2, specified limit 5', async () => {
        const response = await request(app).get('/employee?page=2&limit=5')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.meta.limit).toBe(5);
        expect(response.body.meta.currentPage).toBe(2)
    });


    it('Getting single employee with id 8', async () => {
        const response = await request(app).get('/employee/8')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(8);
        expect(response.body.name).toBeDefined()
        expect(response.body.salary).toBeDefined()
        expect(response.body.department).toBeDefined()
    });

    it('Getting single employee with invalid id', async () => {
        const response = await request(app).get('/employee/1230')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).toBe(404);
        expect(response.body).toBe(
        `Could not find any entity of type "Employee" matching: {\n    "id": 1230\n}`
        );
    });

});

describe("PUT /employee/:id", () => {

    let token : string = '';

    beforeAll(async () => {
        await db.initialize()
        const response = await request(app).post('/auth/login')
            .send(valid)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        token = response.body.token;
    });

    afterAll(async () => {
        await db.destroy();
    });

    const updates = {
        name : 'TESTINGHEHE',
        salary : 12321,
        department : 'PS'
    }

    it('Updating employee with id 8, valid', async () => {
        const response = await request(app).put('/employee/8')
            .set('Authorization', 'Bearer ' + token)
            .send(updates)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                ...updates,
                id : 8
            }
        );
    });

    it('Updating employee with id 7, invalid name', async () => {
        const response = await request(app).put('/employee/7')
            .set('Authorization', 'Bearer ' + token)
            .send({
                ...updates,
                name : 1234
            })
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.name).toBe(
            "ZodError"
        );
        expect(response.body.issues[0].message).toBe(
            "Expected string, received number"
        );
    });

    it('Updating employee with id 7, invalid salary', async () => {
        const response = await request(app).put('/employee/7')
            .set('Authorization', 'Bearer ' + token)
            .send({
                ...updates,
                salary : '21fdd2'
            })
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400)
        expect(response.body.name).toBe("ZodError");
        expect(response.body.issues[0].message).toBe("Expected number, received nan");
    });

    it('Updating employee with id 7, invalid department', async () => {
        const response = await request(app).put('/employee/7')
            .set('Authorization', 'Bearer ' + token)
            .send({
                ...updates,
                department : 'WOO'
            })
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(404);
        expect(response.body).toContain('Could not find any entity of type "Department"');
    });


    it('Updating employee with id 8, no changes', async () => {
        const response = await request(app).put('/employee/8')
            .set('Authorization', 'Bearer ' + token)
            .send(updates)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(304);
    });

})


describe("POST /employees", () => {

    const newEmp = {
        name : 'test',
        salary : 6969,
        department : 'PS'
    }

    let token = '';

    beforeAll(async () => {
        await db.initialize();
        const response = await request(app).post('/auth/login')
            .send(valid)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        token = response.body.token;
    });

    afterAll(async () => {
        await db.destroy();
    });

    it('Inserting employee with valid data', async () => {
        const response = await request(app).post('/employee')
            .set('Authorization', 'Bearer ' + token)
            .send(newEmp)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
    });

    it('Inserting employee with invalid name', async () => {
        const response = await request(app).post('/employee') 
            .set('Authorization', 'Bearer ' + token)
            .send({
                ...newEmp,
                name : 2121
            })
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
    });

    it('Inserting employee with invalid salary', async () => {
        const response = await request(app).post('/employee') 
            .set('Authorization', 'Bearer ' + token)
            .send({
                ...newEmp,
                salary : 'abv'
            })
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
        expect(response.body.name).toBe('ZodError');
        expect(response.body.issues[0].message).toBe('Expected number, received nan');

    });

    it('Inserting employee with invalid department', async () => {        const response = await request(app).post('/employee') 
            .set('Authorization', 'Bearer ' + token)
            .send({
                ...newEmp,
                department : 'BALLS'
            })
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(404);
        expect(response.body).toContain('Could not find any entity of type "Department"');
    });

});

describe("DELETE /employees/:id", () => {

    let token = '';
    beforeAll(async () => {
        await db.initialize()
        const response = await request(app).post('/auth/login')
            .send(valid)
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(200);
        token = response.body.token;
    });

    afterAll(async () => {
        await db.destroy();
    });

    it('Deleting employee with id 8', async () => {
        const response = await request(app).delete('/employee/8')
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toBe(204);

        const checking = await request(app).get('/employee/8')
            .set('Authorization', 'Bearer ' + token)
        expect(checking.status).toBe(404);
    });

    it('Deleting employee with id 8, but not found', async () => {
        const response = await request(app).delete('/employee/8')
            .set('Authorization', 'Bearer ' + token)

        expect(response.status).toBe(404);

    });

})