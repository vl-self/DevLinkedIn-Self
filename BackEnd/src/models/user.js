const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
    minLength: 3,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: [true, "EmailID is required"],
    lowercase: [true, "EmailID should be lowercase"],
    unique: [true, "Use Different EmailId address"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    validate(value) {
      // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
      if (
        !validator.isStrongPassword(value, {
          minLength: 5,
          minUppercase: 0,
        })
      )
        throw new Error("Passowrd is not Strong");
    },
  },
  displayName: {
    type: String,
  },
  age: {
    type: Number,
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
  },
  photoUrl: {
    type: String,
    default: "https://geographyandyou.com/images/user-profile.png",
    validate(value) {
      if (!validator.isURL(value)) throw new Error("Photo URL is not valid");
    },
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        // this is the implemented logic
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `Phone Number ${props.value} is not a valid`,
    },
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECREAT, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (pwdVal) {
  const user = this;
  const hashedPwd = user.password;

  const isPwdValid = await bcrypt.compare(pwdVal, hashedPwd);
  return isPwdValid;
};

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;
