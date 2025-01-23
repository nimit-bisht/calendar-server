import express from "express";

import {
    helloAPI,
    loginUser,
    registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get('/',helloAPI)
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
