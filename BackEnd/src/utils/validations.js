const validator = require("validator");

function validateSignUpData(reqData) {
  if (!reqData) return "Invalida User Request Data";

  if (reqData) {
    const { firstName, password, emailId } = reqData;
    let errMsg = "";
    if (!firstName || firstName?.length < 3) {
      errMsg = "FirstName is required and should be minimum length of 3";
    } else if (!validator.isEmail(emailId)) {
      errMsg = "Email is not Valid";
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 5,
        minUppercase: 0,
      })
    ) {
      errMsg = "Password is not Valid";
    }
    return errMsg;
  }
}

module.exports = validateSignUpData;
