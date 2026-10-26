import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { validateFirstNameValue } from "../../utils/validateFormFields";
import { updateProfileAPI } from "./profileServices";
// (emailId, firstName, lastName, photoUrl, age, gender, about);

const Profile = () => {
  const { loggedInUser } = useAuth();
  const [profileData, setProfileData] = useState(loggedInUser || {});
  const [profileErros, setProfileErros] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e?.target;
    if (name) {
      setProfileData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };

  const validateUpdatedProfileData = () => {
    const errObj = {};
    errObj.firstName = validateFirstNameValue(profileData.firstName);
    errObj.age = validateAgeValue(profileData.age);
    // No validation needed for gender and about

    Object.keys(errObj).forEach((key) => {
      if (!errObj.key) delete errObj[key];
    });

    setProfileErros(errObj);
  };

  const submitProfileChanges = async () => {
    try {
      const resData = updateProfileAPI(profileData);
      setProfileData(resData);
    } catch (e) {
      console.log("Error in updating Profile");
    } finally {
      // TODO: add loading indicator functionality here
    }
  };

  const saveProfile = () => {
    const errors = validateUpdatedProfileData();
    if (Object.keys(errors)) {
      setProfileErros(errors);
    } else {
      submitProfileChanges();
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Email:</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={profileData.emailId}
                      readOnly
                      name="emailId"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.firstName}
                      name="firstName"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleProfileChange}
                    />
                  </label>
                  {profileErros && profileErros?.firstName && (
                    <div style={{ color: "#ff637d", marginTop: "8px" }}>
                      {profileErros?.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.lastName}
                      name="lastName"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleProfileChange}
                    />
                  </label>
                  {profileErros && profileErros?.lastName && (
                    <div style={{ color: "#ff637d", marginTop: "8px" }}>
                      {profileErros?.lastName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Photo URL :</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.photoUrl}
                      name="photoUrl"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleProfileChange}
                    />
                  </label>
                  {profileErros && profileErros?.photoUrl && (
                    <div style={{ color: "#ff637d", marginTop: "8px" }}>
                      {profileErros?.photoUrl}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Age:</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.age}
                      name="age"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleProfileChange}
                    />
                  </label>
                  {profileErros && profileErros?.age && (
                    <div style={{ color: "#ff637d", marginTop: "8px" }}>
                      {profileErros?.age}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Gender:</span>
                    </div>
                    <select
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      name="gender"
                    >
                      <option value="">Don't Want to Disclose</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">About:</span>
                    </div>
                    <input
                      type="text"
                      value={profileData.about}
                      name="about"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleProfileChange}
                    />
                  </label>
                </div>
              </div>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
