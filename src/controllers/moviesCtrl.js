"use strict";

import { validationResult } from "express-validator";
import clienteAxios from "../config/axios";
import {
  titleMovieService,
  createMovieService,
  deleteMovieService,
  updateMovieService,
} from "../services/Movies";

export const searchMovies = async (req, res, next) => {
  try {
    const allMov = await titleMovieService(req.query);
    if (!allMov) return res.json({ msg: "Title don´t match in Movies" });
    res.json(allMov);
  } catch (error) {
    throw new Error(error);
  }
};

export const addMovie = async (req, res, next) => {
  const token = req.header("x-auth-token");
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    const movie = await createMovieService({ ...req.body, token });
    return res.status(201).json(movie);
  } catch (error) {
    console.error(error), next();
  }
};

export const updateMovie = async (req, res, next) => {
  const token = req.header("x-auth-token");
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const movie = await updateMovieService(req.params.id, {
      ...req.body,
      token,
    });
    return res.status(201).json(movie);
  } catch (error) {
    console.error(error), next();
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const deleteMov = await deleteMovieService(req.params.id);
    return res.status(201).json(deleteMov);
  } catch (error) {
    console.error(error);
    next();
  }
};
