import { Router } from "express";
import { 
    getInmuebles, createInmueble, getInmuebleByType, getInmuebleByRooms,
    getInmuebleByBathrooms, getInmuebleByParking, getInmuebleByMtrs,
    getInmuebleByPriceRange, getInmuebleByOwner, getInmueble,
    updateInmueble, deleteInmueble
} from "../Controllers/inmueble.controller";
import { tokenValidation } from "../libs/verifiToken";

const router = Router()

//todas los inmuebles
router.get("/api/inmuebles",tokenValidation, getInmuebles);
//inmuebles por tipo
router.get("/api/inmuebles/tipo/:tipo",tokenValidation, getInmuebleByType);
//inmuebles por n habitaciones
router.get("/api/inmuebles/habitaciones/:numero",tokenValidation, getInmuebleByRooms);
//inmuebles por n baños
router.get("/api/inmuebles/banos/:numero",tokenValidation, getInmuebleByBathrooms);
//inmuebles por n estacionamientos
router.get("/api/inmuebles/estacionamientos/:numero",tokenValidation, getInmuebleByParking);
//inmuebles por n metros cuadrados
router.get("/api/inmuebles/metrosCuadrados/:numero",tokenValidation, getInmuebleByMtrs);
//inmuebles por rango precios
router.get("/api/inmuebles/rangoPrecio/:desde/:hasta",tokenValidation, getInmuebleByPriceRange);
//inmuebles por propietario
router.get("/api/inmuebles/propietario/:idPropietario",tokenValidation, getInmuebleByOwner);


router.post("/api/inmuebles",tokenValidation, createInmueble);
router.get("/api/inmuebles/:id",tokenValidation, getInmueble);
router.put("/api/inmuebles/:id",tokenValidation, updateInmueble);
router.delete("/api/inmuebles/:id",tokenValidation, deleteInmueble);

export default router;