import {Router} from "express"
import conversion from './Conversion.routes'
import auth from './Auth.routes'

const routes = Router();

routes.use("/",conversion);
routes.use("/",auth);

export default routes;