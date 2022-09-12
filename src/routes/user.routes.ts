import { Router } from 'express';
import { loginUserController, 
        createUserController, 
        deleteUserController, 
        listUserByIdController, 
        listUsersController, 
        updateUserController } from '../controllers/users.controllers';
import verifyPersonAuthToken from '../middlewares/verifyPersonAuthToken.middleware';
import verifyOwnerAuth from '../middlewares/verifyOwnerAuth.middleware';


const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", verifyPersonAuthToken, verifyOwnerAuth, listUserByIdController);
userRoutes.delete("/:id", verifyPersonAuthToken, verifyOwnerAuth, deleteUserController);
userRoutes.patch("/:id", verifyPersonAuthToken, verifyOwnerAuth, updateUserController);
userRoutes.post("/login", loginUserController);

export default userRoutes;