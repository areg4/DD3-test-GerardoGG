import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import propietariosRoutes from './routes/propietarios.routes'
import inmueblesRoutes from './routes/inmuebles.routes'
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"


const app = express()

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Inmuebles Test DD3 Gerardo Gudiño García API",
            version : "1.0.0",
            auth:"Gerardo"
        }
    },
    apis: ["./dist/index.js","./dist/Controllers/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use(propietariosRoutes);
app.use(inmueblesRoutes);

//swagger
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs))

export default app;