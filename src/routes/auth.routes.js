'use strict';

import {Router} from 'express';

//controller 
import {SignupUser} from '../controllers/authCtrl';

//validation inputs middleware
import {validationCreateUser} from '../middleware/ValidationInputs';


const router = Router();

// route  "api/auth"
router.post('/signup', 
validationCreateUser,
SignupUser)



export default router;