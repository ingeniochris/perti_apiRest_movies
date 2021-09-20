"use strict";

import { check, body, param } from "express-validator";

export const validationCreateUser = [
  check("email", "Add valid email ").isEmail(),
  check("firstName", "FirstName is required").not().isEmpty(),
  check("lastName", "LastName is required").not().isEmpty(),
  check("password", "The password is min 6 characters").isLength({ min: 6 }),
  check("confirmPassword", "The Confirm password is min 6 characters").isLength(
    { min: 6 }
  ),
  // check("role", "Add role , example.- ROLE_USER or ROLE_ADMIN ")
  //   .not()
  //   .isEmpty()
  //   .toUpperCase(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];

export const validationLogin = [
  check("email", "Add valid email ").isEmail(),
  check("password", "The password is min 6 characters").isLength({ min: 6 }),
];

export const validationMovie = [
  check("title", "Add title ").not().isEmpty(),
  check("year", "Add The year it was filmed").not().isEmpty(),
  check("runtime", "Add the time the movie lasts").not().isEmpty(),
];

export const validationParams = [
  param("id").custom((value, { req }) => {
    if (value !== req.params.id) {
      throw new Error("id is required into params url");
    }
    return true;
  }),
];
