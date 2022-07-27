import { Router } from "express";
const router = Router()
import * as userCtrl from '../controllers/user.controllers'
import {authJwt,verifySignup} from '../middlewares'

router.post('/', [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    verifySignup.checkRolesExisted //para evitar que puedan crear un usuario con otro rol que no exista
], userCtrl.createUser)



export default router