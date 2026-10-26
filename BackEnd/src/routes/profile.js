const express = require("express");
const profileRouter = express.Router();
const UserModal = require("../models/user");
const userAuth = require("../middlewares/userAuth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const curUser = req?.loggedInUser; // we are seeting loggedInUser in the request inside userAuth middleware

    if (curUser) {
      res.status(200).json({
        data: curUser,
        message: "User Fetched successfully",
      });
    } else {
      throw new Error("User not Found");
    }
  } catch (e) {
    res.status(400).json({
      error: e?.message,
      data: null,
    });
  }
});

module.exports = profileRouter;
