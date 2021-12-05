import { Request,Response } from "express"
import { Propietario } from "../entity/Propietario";
import { getRepository } from "typeorm";

/**
 * @swagger
 * /api/propietarios:
 *      get:
 *          tags:
 *          - propietarios
 *          description: Get all Propietarios
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Not Found
 *              500:
 *                  description: Server Error
 */
export const getPropietarios = async(req: Request,res:Response): Promise<Response>=>{
    try{    
        const propietarios = await getRepository(Propietario).find();
        if(propietarios.length>0){
            return res.json(propietarios);
        }
        return res.status(404).json("Propietarios no disponibles");
    }catch(e){
        console.log(e)
        return res.status(500).json("Error al obtener lista de propietario: "+e)
    }
}

/**
 * @swagger
 * /api/propietarios:
 *      post:
 *          tags:
 *          - propietarios
 *          description: Create a New Propietario
 *          parameters:
 *              - name: apiKey
 *                description: ApiKey
 *                in: header
 *                required: true
 *                type: string
 *              - name: nombre
 *                description: Nombre del propietario
 *                in: formData
 *                required: true
 *                type: string
 *              - name: apellidos
 *                description: Apellidos del propietario
 *                in: formData
 *                required: true
 *                type: string
 *          responses:
 *              201:
 *                  description: Created
 *              401:
 *                  description: Access denied
 *              500:
 *                  description: Server Error
 */
export const createPropietario = async (req:Request,res:Response): Promise<Response>=>{
    try{
        const newPropietario = getRepository(Propietario).create(req.body);
        const results = await getRepository(Propietario).save(newPropietario);
        return res.status(201).json(results);
    }catch(e){
        console.log(e)
        return res.status(500).json("Error al crear propietario: "+e)
    }
}

/**
 * @swagger
 * /api/propietarios/{id}:
 *      get:
 *          tags:
 *          - propietarios
 *          description: Get Propietario by ID
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: id
 *            description: ID del Propietario
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Not Found
 *              500:
 *                  description: Server Error
 */
export const getPropietario = async(req: Request,res:Response): Promise<Response>=>{
    try{
        const results = await getRepository(Propietario).findOne(req.params.id);
        if (results){
            return res.json(results);
        }
        return res.status(404).json("Propietario no encontrado")}
    catch(e){
        console.log(e)
        return res.status(500).json("Error al recuperar un propietario: "+e)
    }
}

/**
 * @swagger
 * /api/propietarios/{id}:
 *      put:
 *          tags:
 *          - propietarios
 *          description: Get Propietario by ID
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: id
 *            description: ID del Propietario
 *            in: path
 *            required: true
 *            type: number
 *          - name: nombre
 *            description: Nombre del propietario
 *            in: formData
 *            required: true
 *            type: string
 *          - name: apellidos
 *            description: Apellidos del propietario
 *            in: formData
 *            required: true
 *            type: string
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Not Found
 *              500:
 *                  description: Server Error
 */
export const updatePropietario = async(req: Request,res:Response): Promise<Response>=>{
    try{
        const propietario = await getRepository(Propietario).findOne(req.params.id);
        if (propietario){
            getRepository(Propietario).merge(propietario,req.body)
            const results = await getRepository(Propietario).save(propietario)
            return res.json(results)
        }
        return res.status(404).json("Propietario no encontrado")
    }catch(e){
        console.log(e)
        return res.status(500).json("Error al actualizar propietario: "+e)
    }    
}

/**
 * @swagger
 * /api/propietarios/{id}:
 *      delete:
 *          tags:
 *          - propietarios
 *          description: Get Propietario by ID
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: id
 *            description: ID del Propietario
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Not Found
 *              500:
 *                  description: Server Error
 */
export const deletePropietario = async(req: Request,res:Response): Promise<Response>=>{
    try{
        const propietario = await getRepository(Propietario).findOne(req.params.id);
        if (propietario){
            const results = await getRepository(Propietario).delete(propietario)
            return res.json(results)
        }
        return res.status(404).json("Propietario no encontrado")
    }catch(e){
        console.log(e)
        return res.status(500).json("Error al borrar un propietario: "+e)
    }    
}