"use strict";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//Models DB´s
import User from "../models/User";
import Account from "../models/Account";

/**
 * Function that use bcrypt for encryption
 * @param {String} password
 * @returns passwordEncrypted
 */
const passwordEncryp = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  let passEncrypted = await bcryptjs.hash(password, salt);
  return passEncrypted;
};

/**
 * Function that generate jwt with password payload
 * @param {String} password
 * @returns token jwt
 */
const generateToken = async (password) => {
  const payload = { password };
  const token = await jwt.sign(payload, process.env.SECRETA, {
    expiresIn: 3600,
  });
  return token;
};

/**
 *
 * @param {String} email
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} password
 * @param {String} confirmPassword
 * @param {String} role ROLE_USER or ROLE_ADMIN
 * @returns {Object} User
 */
export const createUser = async ({
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
  role,
}) => {
  const passEncrypted = await passwordEncryp(password);
  const confirmPassEncrypted = await passwordEncryp(confirmPassword);
  const token = await generateToken(password);
  const account = new Account({
    role,
    email,
    password: passEncrypted,
    confirmPassword: confirmPassEncrypted,
    accountVerifyToken: token,
    accountVerifyTokenExpiration: Date.now() + 3600000,
  });
  const user = new User({
    firstName,
    lastName,
    account: await account.save(),
  });

  const newUser = await user.save();
  return newUser;
};

/**
 * Function that verify and update token in DB
 * @param {String} password
 * @param {String} token
 * @returns token
 */
export const verifyUpdateToken = async ({ password, accountVerifyToken }) => {
  const token = await generateToken(password);
  let queryUpdate = { accountVerifyToken: accountVerifyToken };
  await Account.findOneAndUpdate(queryUpdate, {
    $set: {
      accountVerifyToken: token,
      accountVerifyTokenExpiration: Date.now() + 3600000,
    },
  });
  return token;
};
