import { Router } from 'express'
import { loginUserController, 
        createUserController, 
        deleteUserController, 
        listUserByIdController, 
        listUsersController, 
        updateUserController } from '../controllers/users.controllers'

import verifyPersonAuthToken from '../middlewares/verifyPersonAuthToken.middleware'
import verifyOwnerAuth from '../middlewares/verifyOwnerAuth.middleware'

const routes = Router()

routes.post("", createUserController)
routes.get("", listUsersController)
routes.get("/:id", verifyPersonAuthToken, verifyOwnerAuth, listUserByIdController)
routes.delete("/:id", verifyPersonAuthToken, verifyOwnerAuth, deleteUserController)
routes.patch("/:id", verifyPersonAuthToken, verifyOwnerAuth, updateUserController)
routes.post("/login", loginUserController)

export default routes