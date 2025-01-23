import express from "express";
import { validateUser } from "../middleware/validateUser.js";

import {
    helloAPI,
    loginUser,
    registerUser,
    updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get('/',helloAPI)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/update',validateUser, updateUser);
router.put('/update',validateUser, updateUser);


export default router;
