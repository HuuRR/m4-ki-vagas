import { Router } from 'express'
import loginController from '../controllers/login.controller'

const routes = Router()

routes.post("", loginController)

export default routes