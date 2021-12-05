import request from "supertest";
import { createConnections, getConnection } from "typeorm";
import app from "../app"

beforeAll(async () => {
    await createConnections()
})
  
afterAll(async () => {
    const defaultConnection = getConnection('default')
    await defaultConnection.close()
})

describe("Propietario Tests",()=>{
    const propietario = {
        "nombre":"UsuarioTest",
        "apellidos":"TestTest"
    }
    
    // test("Create Propietario",async()=>{
    //     let res = await request(app).post("/api/propietarios").send(propietario).set("apiKey","tokentest")
    //     expect(res.status).toBe(201);
    // })
    
    test("GET list of Propietarios", async()=>{
        let res = await request(app).get("/api/propietarios").set("apiKey","tokentest")
        expect(res.status).toBe(200);
    })

    test("GET Propietario by ID",async()=>{
        let res = await request(app).get("/api/propietarios/1").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("UPDATE Propietario By ID",async()=>{
        let res = await request(app).put("/api/propietarios/1").send(propietario).set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    // test("DELETE Propietario By ID",async()=>{
    //     let res = await request(app).del("/api/propietarios/1").set("apiKey","tokentest")
    //     expect(res.status).toBe(200)
    // })
});