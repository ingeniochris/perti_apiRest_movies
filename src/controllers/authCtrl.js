'use strict';

import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

import Account from '../models/Account';
import {createUser, verifyUpdateToken} from '../services/Users';


export const SignupUser = async (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
  
    const { email } = req.body;

    try {
      const haveUser = await Account.findOne({ email });
      if (haveUser) {
          return res.status(400).json({ msg: "El usuario ya existe" });
      }else{
        const newUser= await createUser({...req.body})
        return res.status(201).json({
            msg: "User signed-up successfully",
            newUser
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({msg: "have an error", error});
    }
  };
  

export const Authentic = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;
  try {
    const haveUser = await Account.findOne({ email });
    if (!haveUser) {
      return res.status(400).json({ msg: "El usuario no existe" });
    };
    const {accountVerifyToken} = haveUser
    const passCorrect = await bcryptjs.compare(password, haveUser.password);
    if (!passCorrect) {
      return res.status(400).json({ msg: "Password Incorrecto" });
    };
    const token = await verifyUpdateToken({...req.body, accountVerifyToken});
    return res.json(token);

  } catch (error) {
    console.log(error);
    res.status(400).send("Have an error");
  };
};


