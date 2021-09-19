"use strict";

import { Router } from "express";

//controllers
import { Authentic } from "../controllers/authCtrl";
import { getUsers } from "../controllers/usersCtrl";

//middleware
import { AuthMiddleware } from "../middleware/Auth";

//validation inputs AuthMiddleware
import { validationLogin } from "../middleware/ValidationInputs";

const router = Router();

// route api/user/
router.post("/login", validationLogin, Authentic);

// Route protected api/user/
router.get("/", AuthMiddleware, getUsers);

export default router;
