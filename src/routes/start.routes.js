"use strict";

import { Router } from "express";
import { startCtrl } from "../controllers/startCtrl";

const router = Router();

router.get("/", startCtrl);

export default router;
