import React, { useState } from "react";
import { Link } from "react-router";
import {
  validateEmailIdValue,
  validatePassWordValue,
  validateFirstNameValue,
} from "../../utils/validateFormFields";
import { useNavigate } from "react-router";
import { signUpAPI } from "./signUpServices";
import "./signup.css";
import { useAuth } from "../auth/AuthContext";

const initSignUpData = {
  firstName: "dev1",
  lastName: "devLastName",
  emailId: "dev1@a.com",
  password: "Dev@123",
};

const SignUp = () => {
  const { onUserLoggedIn } = useAuth();
  const [signupData, setSignupData] = useState(initSignUpData);
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    status: "", //set either success or error to this
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    if (name) {
      setSignupData({
        ...signupData,
        [name]: value,
      });
    }
  };

  const validateSignupData = () => {
    const errorsObj = {};
    errorsObj.emailId = validateEmailIdValue(signupData.emailId);
    errorsObj.password = validatePassWordValue(signupData.password);
    errorsObj.firstName = validateFirstNameValue(signupData.firstName);
    Object.keys(errorsObj).forEach((key) => {
      if (!errorsObj[key]) delete errorsObj[key];
    });
    return errorsObj;
  };

  const submitSignUpForm = async () => {
    try {
      const res = await signUpAPI(signupData);

      if (res && res?.data) {
        setFormStatus({
          status: "success",
          message: res?.message,
        });
        onUserLoggedIn(res?.data); // Setting Auth Context
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Bad Response Format during Singup");
      }
    } catch (err) {
      setFormStatus({
        status: "error",
        message: err?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSignUpSubmitClick = (e) => {
    e.preventDefault(); // 2. THIS STOPS THE RELOAD AND URL PARAMETERS

    setLoading(true);

    const errRes = validateSignupData();
    setFormErrors(errRes);
    setLoading(false);
    if (!Object.keys(errRes).length) submitSignUpForm();
  };

  return (
    <div>
      <form onSubmit={onSignUpSubmitClick} noValidate>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">SignUp</legend>

          <div className="fieldDiv">
            <label className="label fieldLabel" htmlFor="signup-firstname">
              FirstName <span className="requiredStar">*</span>
            </label>
            <input
              type="text"
              className="input"
              name="firstName"
              id="signup-firstname"
              placeholder="Enter First Name"
              value={signupData.firstName}
              onChange={handleInputChange}
            />
            {formErrors && formErrors?.firstName && (
              <div className="errorText">{formErrors?.firstName}</div>
            )}
          </div>

          <div className="fieldDiv">
            <label className="label fieldLabel" htmlFor="signup-lastname">
              LastName
            </label>
            <input
              type="text"
              className="input"
              name="lastName"
              id="signup-lastname"
              placeholder="Enter Last Name"
              value={signupData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="fieldDiv">
            <label className="label fieldLabel" htmlFor="signup-emailId">
              Email Id <span className="requiredStar">*</span>
            </label>
            <input
              type="email"
              className="input"
              name="emailId"
              id="signup-emailId"
              value={signupData.emailId}
              placeholder="Enter EmailId"
              required
              onChange={handleInputChange}
            />
            {formErrors && formErrors?.emailId && (
              <div className="errorText">{formErrors?.emailId}</div>
            )}
          </div>

          <div className="fieldDiv">
            <label className="label fieldLabel" htmlFor="signup-password">
              PassWord <span className="requiredStar">*</span>
            </label>
            <input
              className="input"
              type="password"
              name="password"
              id="signup-password"
              value={signupData.password}
              placeholder="Enter Password"
              required
              onChange={handleInputChange}
            />
            {formErrors && formErrors?.password && (
              <div className="errorText">{formErrors?.password}</div>
            )}
          </div>

          {formStatus?.message && (
            <div className={`status-${formStatus.status}`}>
              <span>Error: {formStatus?.message}</span>
            </div>
          )}

          <button
            className="btn btn-neutral mt-4"
            disabled={loading ? true : false}
          >
            SignUp
          </button>

          <div className="mt-2">
            <Link to="/login" className="link link-primary">
              Already having account Login Here!
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
