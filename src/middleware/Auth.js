'use strict';

import jwt from 'jsonwebtoken';
import Account from '../models/Account';

export const AuthMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({msg: 'No Token, invalid permission'})
    }
    
    try {
        const verifyAccount = await Account.findOne({
            accountVerifyToken: token,
            accountVerifyTokenExpiration: { $gt: Date.now() },
          })
        if(!verifyAccount) res.status(403).json({msg: 'The token in the url is expired, don´t try to fool me'})
      
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.email = cifrado.email;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no valid !!'});
    }
}