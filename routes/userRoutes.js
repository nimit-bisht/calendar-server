import express from "express";

import {
    helloAPI,
    registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get('/',helloAPI)
router.post('/register', registerUser);

export default router;
