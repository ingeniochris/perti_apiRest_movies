'use strict';

import Account from '../models/Account';
export const isAdmin = async (req,res, next) => {
    try {
        let token = req.token;
    const verifyAccount = await Account.findOne({
        accountVerifyToken: token,
        accountVerifyTokenExpiration: { $gt: Date.now() },
      });
    const {role}= verifyAccount;
    console.log(role)
    if(role==='ROLE_USER') return res.status(403).json({msg:'admin role is necessary'})
    next();
    return;
    } catch (error) {
        console.log(error)
    return res.status(500).send({ msg: error });
    }
};