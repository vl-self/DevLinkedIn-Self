const jwt = require("jsonwebtoken");
const UserModal = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies; // we need cookie-parser npm package to parse cookie from req

    // check token in the request
    if (!token) {
      res.status(401).json({
        error: "UnAuthenticated or Invalid Token",
        data: null,
      });
    }

    //verify token again JWT
    const decodedObj = await jwt.verify(token, process.env.JWT_SECREAT);
    console.log("jwt decoded", decodedObj);

    const { _id } = decodedObj;
    const filteredUser = await UserModal.findById(_id);

    if (!filteredUser) {
      console.log("inside throw error");
      throw new Error("User not found");
    } else {
      req.loggedInUser = filteredUser;
      next();
    }
  } catch (err) {
    console.log("Error", err);
    res.status(401).json({
      error: `Error in Authentication ${err.message}`,
      data: null,
    });
  }
};

module.exports = userAuth;
