'use strict';

import {Router} from 'express';

//middleware
import {AuthMiddleware} from '../middleware/Auth';

import {getMovies, addMovie} from '../controllers/moviesCtrl';

import {validationMovie} from '../middleware/ValidationInputs';

const router = Router();


//Route protected api/movies
router.get('/all',
 AuthMiddleware,
 getMovies
);

//Route protected api/movies
router.post('/add',
AuthMiddleware,
validationMovie,
addMovie
);


export default router;