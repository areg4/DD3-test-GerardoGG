import 'reflect-metadata'
import { createConnection } from "typeorm"
import app from "./app"

createConnection();

app.listen(3000)

console.log("Server on port",3000)