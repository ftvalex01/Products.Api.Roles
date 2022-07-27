import { Router } from "express";
import * as authCtrl from '../controllers/auth.controllers'
import { verifySignup } from "../middlewares";
const router = Router()



router.post('/signup',[verifySignup.checkDuplicateUser,verifySignup.checkRolesExisted],authCtrl.signUp)

router.post('/signin', authCtrl.signIn)






export default router