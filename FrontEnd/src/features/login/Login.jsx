import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  validateEmailIdValue,
  validatePassWordValue,
} from "../../utils/validateFormFields";

import { loginApi } from "./loginServices";
import { useAuth } from "../auth/AuthContext";

const initFormData = {
  emailId: "dev1@a.com",
  password: "Dev@123",
};

const Login = () => {
  const { onUserLoggedIn } = useAuth();
  const [formData, setFormData] = useState(initFormData);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({
    status: "", //set either success or error to this
    message: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateLoginFormDetails = () => {
    const errorsObj = {};
    errorsObj.emailId = validateEmailIdValue(formData.emailId);
    errorsObj.password = validatePassWordValue(formData.password);

    Object.keys(errorsObj).forEach((key) => {
      if (!errorsObj[key]) delete errorsObj[key];
    });

    return errorsObj;
  };

  const submitFormData = async () => {
    try {
      const res = await loginApi(formData);
      if (res && res?.data) {
        setFormStatus({
          status: "success",
          message: res?.message,
        });
        onUserLoggedIn(res?.data); // Setting Auth Context
        navigate("/dashboard", { replace: true });
      } else {
        console.error("Bad Response Format during Login");
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

  const handleSubmit = (e) => {
    e.preventDefault(); // 2. THIS STOPS THE RELOAD AND URL PARAMETERS
    setLoading(true);
    const errRes = validateLoginFormDetails();
    setFormErrors(errRes);
    setLoading(false);
    if (!Object.keys(errRes).length) submitFormData();
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <div>
            <label className="input validator" htmlFor="login-email">
              <input
                type="email"
                id="login-email"
                name="emailId"
                value={formData.emailId}
                placeholder="mail@site.com"
                required
                onChange={handleInputChange}
              />
            </label>
            {formErrors && formErrors?.emailId && (
              <div className="validator-hint">{formErrors?.emailId}</div>
            )}
          </div>

          <div>
            <label className="input validator" htmlFor="login-password">
              <input
                type="password"
                name="password"
                id="login-password"
                value={formData.password}
                required
                placeholder="Password"
                minLength="5"
                pattern="(?=.*\d).{5,}"
                title="Must be more than 5 characters, including number"
                onChange={handleInputChange}
              />
            </label>
            {formErrors && formErrors?.password && (
              <div className="validator-hint">{formErrors?.password}</div>
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
            Login
          </button>

          <div className="mt-2">
            <Link to="/signup" className="link link-primary">
              Sing Up here!
            </Link>
          </div>
          <div className="mt-1">
            <a className="link link-primary">Forgot Passowrd!</a>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
