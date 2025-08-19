/*
import express from "express";
import { registerController, loginController } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)

export default router;
*/
import express from "express";
import { registerController,loginController } from "../controllers/auth.controller.js";
import { registerValidator } from "../middlewares/validator.middleware.js";

const router = express.Router();


router.post('/register',
    registerValidator,
    registerController
)
router.post('/login',loginController)


export default router;