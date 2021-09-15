'use strict';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Models DB´s
import User from "../models/User";
import Account from '../models/Account';

export const createUser = async ({email, firstName, lastName, password, confirmPassword, role}) => {
    const salt = await bcryptjs.genSalt(10);
    let passwordEncryp = await bcryptjs.hash(password, salt);
    let confirmPasswordEncryp = await bcryptjs.hash(confirmPassword, salt);
    const payload = { password };
    const token = await jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600,
    });
    const account = new Account({
      role,
      email,
      password: passwordEncryp,
      confirmPassword: confirmPasswordEncryp,
      accountVerifyToken: token,
      accountVerifyTokenExpiration: Date.now() + 3600000,
    });
    const user = new User({
      firstName,
      lastName,
      account: await account.save()
    });
    
     const newUser = await user.save();
     return newUser;
};


export const verifyUpdateToken = async ({password, accountVerifyToken}) => {
    
    const payload = { password };
    const token = await jwt.sign(payload, process.env.SECRETA, {
      expiresIn: 3600,
    });
    let queryUpdate= {accountVerifyToken: accountVerifyToken};
    await Account.findOneAndUpdate(queryUpdate, {$set:{accountVerifyToken:token, accountVerifyTokenExpiration: Date.now() + 3600000}})
    return token;
}