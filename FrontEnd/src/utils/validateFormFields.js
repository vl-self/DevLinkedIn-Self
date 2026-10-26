export const validateFirstNameValue = (firstNameVal) => {
  if (!firstNameVal) return "FirstName is Required";
  if (firstNameVal && (firstNameVal.length < 3 || firstNameVal.length > 50))
    return "FirstName value should be minimum 3 characters and maximum 50 characters long";
  return "";
};

export const validateEmailIdValue = (emaildVal) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emaildVal) {
    return "Email Id is Required";
  } else if (!emailRegex.test(emaildVal)) {
    return "Email is not in correct format";
  }
  return "";
};

export const validatePassWordValue = (pwdVal) => {
  const passwordRegex = /^(?=.*\d).{6,}$/;

  if (!pwdVal) {
    return "Password is Required";
  } else if (!passwordRegex.test(pwdVal)) {
    return "Password Must be more than 5 characters, including number";
  }
  return "";
};
