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


describe("Inmuebles Test",()=>{
    const inmueble = {
        "habitaciones":4,
        "banios":2,
        "estacionamientos":1,
        "metrosCuadrados":100.5,
        "precio":1000000,
        "imagenes":2,
        "status":2,
        "propietarioId":1
    }

    // test("CREATE Inmueble",async()=>{
    //     let res = await request(app).post("/api/inmuebles").send(inmueble).set("apiKey","tokentest")
    //     expect(res.status).toBe(201)
    // })

    test("GET list of Inmuebles", async()=>{
        let res = await request(app).get("/api/inmuebles").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmueble by ID", async()=>{
        let res = await request(app).get("/api/inmuebles/1").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by type", async()=>{
        let res = await request(app).get("/api/inmuebles/tipo/2").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by rooms", async()=>{
        let res = await request(app).get("/api/inmuebles/habitaciones/4").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by Bathrooms",async()=>{
        let res = await request(app).get("/api/inmuebles/banos/2").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by parking",async()=>{
        let res = await request(app).get("/api/inmuebles/estacionamientos/1").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by meters",async()=>{
        let res = await request(app).get("/api/inmuebles/metrosCuadrados/100.5").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by price range", async()=>{
        let res = await request(app).get("/api/inmuebles/rangoPrecio/0/1000000").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("GET Inmuebles by ID Propietario", async()=>{
        let res = await request(app).get("/api/inmuebles/propietario/1").set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    test("UPDATE Inmueble by ID", async()=>{
        let res = await request(app).put("/api/inmuebles/1").send(inmueble).set("apiKey","tokentest")
        expect(res.status).toBe(200)
    })

    // test("DELETE Inmueble by ID", async()=>{
    //     let res = await request(app).del("/api/inmueble/1")
    //     expect(res.status).toBe(200)
    // })
})