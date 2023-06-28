import { Router } from "express";
import ConversionController from "../controllers/Conversion.controller";
import { checkToken } from "../middlewares/checkJwt";
import { ROLES } from "../config/constantes";

const router =  Router();

router.post('/conversion', checkToken([ROLES.USER,ROLES.ADMIN],false), ConversionController.convertirUF,); //Crear una especialidad
router.get('/mis-conversiones',checkToken([ROLES.USER,ROLES.ADMIN],false), ConversionController.conversiones); //Crear una especialidad
router.get('/historial',checkToken([ROLES.ADMIN]), ConversionController.historial,); //Crear una especialidad


export default router;
