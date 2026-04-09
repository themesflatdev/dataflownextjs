"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

const AddCategoryForm: React.FC = () => {
  const [preview, setPreview] = useState<string>("images/");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      categoryName: formData.get("categoryName"),
      file: formData.get("filename"),
    };

    console.log("submit payload:", payload);
  };

  return (
    <form className="form-add-category" onSubmit={handleSubmit}>
      <div className="wg-box mb-30">
        <fieldset className="name mw-585">
          <div className="body-title mb-10">
            Category name <span className="tf-color-1">*</span>
          </div>
          <input
            className="mb-10"
            type="text"
            placeholder="Category name"
            name="categoryName"
            tabIndex={0}
            defaultValue=""
            required
          />
        </fieldset>

        <fieldset className="mw-585">
          <div className="body-title mb-10">Upload images</div>
          <div className="upload-image mb-16">
            <div className="up-load">
              <label className="uploadfile" htmlFor="myFile">
                <span className="icon">
                  <i className="icon-upload-cloud"></i>
                </span>
                <span className="text-tiny">
                  Drop your images here or select{" "}
                  <span className="text-secondary">click to browse</span>
                </span>
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="cols gap10">
        <button className="tf-button w380" type="submit">
          Add Category
        </button>
        <a href="#" className="tf-button style-3 w380">
          Cancel
        </a>
      </div>
    </form>
  );
};

export default AddCategoryForm;