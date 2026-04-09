"use client";

import React, { FormEvent } from "react";

const AddAttributesForm: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      attributeName: formData.get("attributeName"),
      attributeValue: formData.get("attributeValue"),
    };

    console.log("submit payload:", payload);
  };

  return (
    <form className="form-add-attributes" onSubmit={handleSubmit}>
      <div className="wg-box mb-30">
        <fieldset className="name mw-585">
          <div className="body-title mb-10">
            Attributes name <span className="tf-color-1">*</span>
          </div>
          <input
            className=""
            type="text"
            placeholder="Attributes name"
            name="attributeName"
            tabIndex={0}
            defaultValue=""
            required
          />
        </fieldset>

        <fieldset className="value mw-585">
          <div className="body-title mb-10">
            Attributes value <span className="tf-color-1">*</span>
          </div>
          <input
            className=""
            type="text"
            placeholder="Attributes value"
            name="attributeValue"
            tabIndex={0}
            defaultValue=""
            required
          />
        </fieldset>
      </div>

      <div className="cols gap10">
        <button className="tf-button w380" type="submit">
          Add Attributes
        </button>
        <a href="#" className="tf-button style-3 w380">
          Cancel
        </a>
      </div>
    </form>
  );
};

export default AddAttributesForm;