"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

type FormDataType = {
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  email: string;
  role: string;
  enableGoogle: "yes" | "no";
  googleLoginId: string;
  googleSecretKey: string;
  enableFacebook: "yes" | "no";
  facebookId: string;
  facebookSecretKey: string;
};

export default function SettingForm() {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "Kristin",
    lastName: "Watson",
    address: "52 Davis Street, Buffalo, New York",
    contact: "+1 548 562 1023",
    email: "kristin@dataflow.com",
    role: "Sale Administrator",
    enableGoogle: "yes",
    googleLoginId: "",
    googleSecretKey: "",
    enableFacebook: "yes",
    facebookId: "",
    facebookSecretKey: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted form:", formData);
  };

  return (
    <form className="form-setting form-style-2" onSubmit={handleSubmit}>
      <div className="wg-box">
        <div className="left">
          <div className="h5 mb-4">General Information</div>
          <div className="body-text">Setting general information</div>
        </div>
        <div className="right flex-grow">
          <div className="cols gap24">
            <fieldset className="mb-24">
              <div className="body-title mb-10">First Name</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="First Name"
                name="firstName"
                tabIndex={0}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="mb-24">
              <div className="body-title mb-10">Last Name</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Last Name"
                name="lastName"
                tabIndex={0}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </fieldset>
          </div>

          <div className="cols gap24">
            <fieldset className="mb-24">
              <div className="body-title mb-10">Address</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Address"
                name="address"
                tabIndex={0}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="mb-24">
              <div className="body-title mb-10">Contact</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Contact"
                name="contact"
                tabIndex={0}
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </fieldset>
          </div>

          <div className="cols gap24">
            <fieldset className="sm-mb-24">
              <div className="body-title mb-10">Email</div>
              <input
                className="flex-grow"
                type="email"
                placeholder="Email"
                name="email"
                tabIndex={0}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="">
              <div className="body-title mb-10">Role</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Address"
                name="role"
                tabIndex={0}
                value={formData.role}
                onChange={handleChange}
                required
              />
            </fieldset>
          </div>
        </div>
      </div>

      <div className="wg-box">
        <div className="left">
          <div className="h5 mb-4">Login</div>
          <div className="body-text">Setting Login information</div>
        </div>
        <div className="right flex-grow">
          <fieldset className="mb-24">
            <div className="body-title mb-10">Enable Google Login?</div>
            <div className="radio-buttons">
              <div className="item">
                <input
                  className=""
                  type="radio"
                  name="enableGoogle"
                  id="enable-google1"
                  value="yes"
                  checked={formData.enableGoogle === "yes"}
                  onChange={handleChange}
                />
                <label className="" htmlFor="enable-google1">
                  <span className="body-title-2">Yes</span>
                </label>
              </div>
              <div className="item">
                <input
                  className=""
                  type="radio"
                  name="enableGoogle"
                  id="enable-google2"
                  value="no"
                  checked={formData.enableGoogle === "no"}
                  onChange={handleChange}
                />
                <label className="" htmlFor="enable-google2">
                  <span className="body-title-2">No</span>
                </label>
              </div>
            </div>
          </fieldset>

          <div
            className="cols gap24"
            style={{ display: formData.enableGoogle === "yes" ? "grid" : "none" }}
          >
            <fieldset className="mb-24">
              <div className="body-title mb-10">Google Login ID</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Enter Google Login ID"
                name="googleLoginId"
                tabIndex={0}
                value={formData.googleLoginId}
                onChange={handleChange}
                required={formData.enableGoogle === "yes"}
                disabled={formData.enableGoogle !== "yes"}
              />
            </fieldset>
            <fieldset className="mb-24">
              <div className="body-title mb-10">Google Secret Key</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Enter Google Secret Key"
                name="googleSecretKey"
                tabIndex={0}
                value={formData.googleSecretKey}
                onChange={handleChange}
                required={formData.enableGoogle === "yes"}
                disabled={formData.enableGoogle !== "yes"}
              />
            </fieldset>
          </div>

          <fieldset className="mb-24">
            <div className="body-title mb-10">Enable Facebook Login?</div>
            <div className="radio-buttons">
              <div className="item">
                <input
                  className=""
                  type="radio"
                  name="enableFacebook"
                  id="enable-facebook1"
                  value="yes"
                  checked={formData.enableFacebook === "yes"}
                  onChange={handleChange}
                />
                <label className="" htmlFor="enable-facebook1">
                  <span className="body-title-2">Yes</span>
                </label>
              </div>
              <div className="item">
                <input
                  className=""
                  type="radio"
                  name="enableFacebook"
                  id="enable-facebook2"
                  value="no"
                  checked={formData.enableFacebook === "no"}
                  onChange={handleChange}
                />
                <label className="" htmlFor="enable-facebook2">
                  <span className="body-title-2">No</span>
                </label>
              </div>
            </div>
          </fieldset>

          <div
            className="cols gap24"
            style={{ display: formData.enableFacebook === "yes" ? "grid" : "none" }}
          >
            <fieldset className="sm-mb-24">
              <div className="body-title mb-10">Facebook ID </div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Enter Facebook ID "
                name="facebookId"
                tabIndex={0}
                value={formData.facebookId}
                onChange={handleChange}
                required={formData.enableFacebook === "yes"}
                disabled={formData.enableFacebook !== "yes"}
              />
            </fieldset>
            <fieldset className="">
              <div className="body-title mb-10">Facebook Secret Key</div>
              <input
                className="flex-grow"
                type="text"
                placeholder="Enter Facebook Secret Key"
                name="facebookSecretKey"
                tabIndex={0}
                value={formData.facebookSecretKey}
                onChange={handleChange}
                required={formData.enableFacebook === "yes"}
                disabled={formData.enableFacebook !== "yes"}
              />
            </fieldset>
          </div>
        </div>
      </div>

      <div className="cols gap10">
        <button className="tf-button w380" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}