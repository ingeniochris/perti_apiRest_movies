"use strict";

import User from "../models/User";

export const getUsers = async (req, res, next) => {
  //const {email} = req.body;
  try {
    const user = await User.find();
    if (!user) next();
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Have an error" });
  }
};
