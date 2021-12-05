import { Router } from "express";
import { getPropietarios, createPropietario,getPropietario, updatePropietario, deletePropietario } from "../Controllers/propietario.controller";
import { tokenValidation } from "../libs/verifiToken";

const router = Router()

router.get("/api/propietarios",tokenValidation, getPropietarios);
router.get("/api/propietarios/:id",tokenValidation, getPropietario);
router.post("/api/propietarios",tokenValidation, createPropietario);
router.put("/api/propietarios/:id",tokenValidation, updatePropietario);
router.delete("/api/propietarios/:id",tokenValidation, deletePropietario);

export default router;