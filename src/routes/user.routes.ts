import { Router } from 'express'
import { createUserController, deleteUserController, listUserByIdController, listUsersController, updateUserController } from '../controllers/users.controllers'

const routes = Router()

routes.post("", createUserController) // não completo falta as competencias
routes.get("", listUsersController)
routes.get("/:id", listUserByIdController)
routes.delete("/:id", deleteUserController)
routes.patch("/:id", updateUserController)

export default routes