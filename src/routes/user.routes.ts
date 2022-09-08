import { Router } from 'express'
import { loginUserController, 
        createUserController, 
        deleteUserController, 
        listUserByIdController, 
        listUsersController, 
        updateUserController } from '../controllers/users.controllers'
import verifyAuthToken from '../middlewares/verifyAuthToken.middleware'

const routes = Router()

routes.post("", createUserController)
routes.get("", listUsersController)
routes.get("/:id", verifyAuthToken, listUserByIdController)
routes.delete("/:id", verifyAuthToken, deleteUserController)
routes.patch("/:id", verifyAuthToken, updateUserController)
routes.post("/login", loginUserController)

export default routes