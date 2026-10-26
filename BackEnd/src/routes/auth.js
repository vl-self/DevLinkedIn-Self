const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const validateSignUpData = require("../utils/validations");
const UserModal = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const errMsg = validateSignUpData(req.body);
    console.log("singup", req.body, errMsg);

    if (errMsg) {
      throw new Error(errMsg);
    }
    const { firstName, lastName, emailId, password } = req.body;

    // Encryptying Password
    const encryptPwd = await bcrypt.hash(password, 10);
    const newUserData = {
      firstName,
      lastName,
      emailId,
      password: encryptPwd,
    };

    // Save date to user model
    const user = new UserModal(newUserData);
    const savedUser = await user.save();

    // Creating jwt token and token value in cookie with expiration time
    const createdToken = savedUser.getJWT();
    res.cookie("token", createdToken, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(201).json({
      message: "User Added successfully!",
      data: savedUser,
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: err?.message,
      data: null,
      message: null,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await UserModal.findOne({ emailId: emailId });
    // console.log("user", user);
    const isPwdValid = await user.validatePassword(password);

    if (isPwdValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).json({
        message: "Login Successfull!",
        data: user,
        error: null,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send({
      message: `Errro during Login: ${err.message}`,
      data: null,
    });
  }
});

module.exports = authRouter;
