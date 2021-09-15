'use strict';

import {validationResult} from 'express-validator';
import clienteAxios from '../config/axios';
import {allMoviesTitle, createMovie} from '../services/Movies';

export const getMovies = async (req,res, next) => {
    try {
        const allMov = await allMoviesTitle(req.query);
        if(!allMov) return res.json({msg:"Title don´t match in Movies"});
         res.json(allMov);   
    } catch (error) {
        throw new Error(error);
    }
};

export const addMovie = async (req,res, next) => {
    const token = req.header('x-auth-token');
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    try {
        const movie = await createMovie({...req.body, token});
        return res.status(201).json(movie);
    } catch (error) {
        console.error(error),
        next();
    }
}