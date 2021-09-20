"use strict";

import { Router } from "express";

//middleware
import { AuthMiddleware } from "../middleware/Auth";
import { isAdmin } from "../middleware/isAdmin";

import {
  searchMovies,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../controllers/moviesCtrl";

import {
  validationMovie,
  validationParams,
} from "../middleware/ValidationInputs";

const router = Router();

//Route protected api/movies
router.get("/", AuthMiddleware, searchMovies);

//Route protected api/movies
router.post("/add",[ AuthMiddleware, validationMovie], addMovie);

//Route protected api/movies
router.put(
  "/update/:id",
  [AuthMiddleware,
  validationParams,
  validationMovie],
  updateMovie
);

router.delete("/delete/:id", [AuthMiddleware,isAdmin], deleteMovie);

export default router;
