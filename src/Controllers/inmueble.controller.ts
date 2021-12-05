import { Request, Response } from "express";
import { Inmueble } from "../entity/Inmueble";
import { Between, getRepository } from "typeorm";

/**
 * @swagger
 * /api/inmuebles:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get all inmuebles
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
export const getInmuebles = async (req:Request,res:Response): Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find();
        if(inmuebles.length>0){
            return res.json(inmuebles);
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener lista de inmuebles")
    }
}

/**
 * @swagger
 * /api/inmuebles:
 *      post:
 *          tags:
 *          - inmuebles
 *          description: Create a New Inmueble
 *          parameters:
 *              - name: apiKey
 *                description: ApiKey
 *                in: header
 *                required: true
 *                type: string
 *              - name: habitaciones
 *                description: Número de habitaciones
 *                in: formData
 *                required: true
 *                type: number
 *              - name: banios
 *                description: Número de baños
 *                in: formData
 *                required: true
 *                type: number
 *              - name: estacionamientos
 *                description: Número de estacionamientos
 *                in: formData
 *                required: true
 *                type: number
 *              - name: metrosCuadrados
 *                description: Número de metros cuadrados
 *                in: formData
 *                required: true
 *                type: number
 *              - name: precio
 *                description: Precio
 *                in: formData
 *                required: true
 *                type: number
 *              - name: imagenes
 *                description: Número de imágenes
 *                in: formData
 *                required: true
 *                type: number
 *              - name: status
 *                description: Estátus de la casa (1.- Renta, 2.- Venta,  3.- Ambos)
 *                in: formData
 *                required: true
 *                type: number
 *              - name: propietarioId
 *                description: ID del propietario
 *                in: formData
 *                required: true
 *                type: number
 *          responses:
 *              201:
 *                  description: Created
 *              401:
 *                  description: Access denied
 *              500:
 *                  description: Server Error
 */
export const createInmueble = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const newInmueble = getRepository(Inmueble).create(req.body);
        const results = await getRepository(Inmueble).save(newInmueble);
        return res.status(201).json(results)
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al crear inmuebles")
    }
}

/**
 * @swagger
 * /api/inmuebles/{id}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by ID
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: id
 *            description: ID del Inmueble
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmueble = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const results = await getRepository(Inmueble).findOne(req.params.id);
        if(results){
            return res.json(results)
        }
        return res.status(404).json("Inmueble no disponible")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble")
    }
}

/**
 * @swagger
 * /api/inmuebles/{id}:
 *      put:
 *          tags:
 *          - inmuebles
 *          description: Update a New Inmueble
 *          parameters:
 *              - name: apiKey
 *                description: ApiKey
 *                in: header
 *                required: true
 *                type: string
 *              - name: id
 *                description: ID del Inmueble
 *                in: path
 *                required: true
 *                type: number
 *              - name: habitaciones
 *                description: Número de habitaciones
 *                in: formData
 *                required: true
 *                type: number
 *              - name: banios
 *                description: Número de baños
 *                in: formData
 *                required: true
 *                type: number
 *              - name: estacionamientos
 *                description: Número de estacionamientos
 *                in: formData
 *                required: true
 *                type: number
 *              - name: metrosCuadrados
 *                description: Número de metros cuadrados
 *                in: formData
 *                required: true
 *                type: number
 *              - name: precio
 *                description: Precio
 *                in: formData
 *                required: true
 *                type: number
 *              - name: imagenes
 *                description: Número de imágenes
 *                in: formData
 *                required: true
 *                type: number
 *              - name: status
 *                description: Estátus de la casa (1.- Renta, 2.- Venta,  3.- Ambos)
 *                in: formData
 *                required: true
 *                type: number
 *              - name: propietarioId
 *                description: ID del propietario
 *                in: formData
 *                required: true
 *                type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const updateInmueble = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmueble = await getRepository(Inmueble).findOne(req.params.id);
        if(inmueble){
            getRepository(Inmueble).merge(inmueble,req.body)
            const results = await getRepository(Inmueble).save(inmueble)
            return res.json(results)
        }
        return res.status(404).json("Inmueble no disponible")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al actualizar inmueble")
    }
}

/**
 * @swagger
 * /api/inmuebles/{id}:
 *      delete:
 *          tags:
 *          - inmuebles
 *          description: Delete Inmueble by ID
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: id
 *            description: ID del Inmueble
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const deleteInmueble = async(req:Request, res:Response):Promise<Response>=>{
    try {
        const inmueble = await getRepository(Inmueble).findOne(req.params.id);
        if(inmueble){
            const results = await getRepository(Inmueble).delete(inmueble)
            return res.json(results)
        }
        return res.status(404).json("Inmueble no disponible")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al eliminar inmueble")
    }
}

/**
 * @swagger
 * /api/inmuebles/tipo/{tipo}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by type (1.- Renta, 2.- Venta,  3.- Ambos)
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: tipo
 *            description: Tipo de Inmueble (1.- Renta, 2.- Venta,  3.- Ambos)
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByType = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { status: req.params.tipo} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por tipo")
    }
}

/**
 * @swagger
 * /api/inmuebles/habitaciones/{numero}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by number of rooms
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: numero
 *            description: Número de habitaciones
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByRooms = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { habitaciones: req.params.numero} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por numero de habitaciones")
    }
}

/**
 * @swagger
 * /api/inmuebles/banos/{numero}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by number of bathrooms
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: numero
 *            description: Número de Baños
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByBathrooms = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { banios: req.params.numero} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por numero de banios")
    }
}

/**
 * @swagger
 * /api/inmuebles/estacionamientos/{numero}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by number of parkings
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: numero
 *            description: Número de estacionamientos
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByParking = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { estacionamientos: req.params.numero} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por numero de estacionamientos")
    }
}

/**
 * @swagger
 * /api/inmuebles/metrosCuadrados/{numero}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by number of meters
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: numero
 *            description: Número de metros cuadrados
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByMtrs = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { metrosCuadrados: req.params.numero} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por numero de metros cuadrados")
    }
}

/**
 * @swagger
 * /api/inmuebles/rangoPrecio/{desde}/{hasta}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by price range
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: desde
 *            description: Precio inicial
 *            in: path
 *            required: true
 *            type: number
 *          - name: hasta
 *            description: Precio final
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByPriceRange = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { precio: Between(req.params.desde,req.params.hasta)} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por rango de precio")
    }
}

/**
 * @swagger
 * /api/inmuebles/propietario/{idPropietario}:
 *      get:
 *          tags:
 *          - inmuebles
 *          description: Get Inmueble by ID Propietario
 *          parameters:
 *          - name: apiKey
 *            description: ApiKey
 *            in: header
 *            required: true
 *            type: string
 *          - name: idPropietario
 *            description: ID del propietario
 *            in: path
 *            required: true
 *            type: number
 *          responses:
 *              200:
 *                  description: OK
 *              401:
 *                  description: Access denied
 *              404:
 *                  description: Inmueble Not Found
 *              500:
 *                  description: Server Error
 */
export const getInmuebleByOwner = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const inmuebles = await getRepository(Inmueble).find({ where: { propietarioId: req.params.idPropietario} })
        if (inmuebles.length>0){
            return res.json(inmuebles)
        }
        return res.status(404).json("Inmuebles no disponibles")
    } catch (e) {
        console.log(e)
        return res.status(500).json("Error al obtener inmueble por ID de propietario")
    }
}