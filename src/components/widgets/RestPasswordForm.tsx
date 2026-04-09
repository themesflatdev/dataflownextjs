"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetPasswordForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const password = String(formData.get("password") || "");
        const confirmPassword = String(formData.get("confirmPassword") || "");

        if (password !== confirmPassword) {
            alert("Confirm password does not match");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            alert("Password reset successful");
            router.push("/login");
        }, 500);
    };

    return (
        <div className="login-page">
            <div className="left">
                <Image
                    width={960}
                    height={919}
                    src="/images/images-section/sign-in.jpg"
                    alt="image"
                />
            </div>

            <div className="right">
                <div className="login-box">
                    <form
                        className="form-login flex flex-column gap22 w-full"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <h3>Reset your password</h3>
                        </div>

                        <fieldset className="password">
                            <div className="body-title mb-10 text-white">
                                Password <span className="tf-color-1">*</span>
                            </div>
                            <input
                                className="password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                name="password"
                                tabIndex={0}
                                defaultValue=""
                                required
                            />
                            <span
                                className="show-pass"
                                onClick={() => setShowPassword((prev) => !prev)}
                                style={{ cursor: "pointer" }}
                            >
                                <i className="icon-eye view"></i>
                                <i className="icon-eye-off hide"></i>
                            </span>
                        </fieldset>

                        <fieldset className="password">
                            <div className="body-title mb-10 text-white">
                                Confirm Password{" "}
                                <span className="tf-color-1">*</span>
                            </div>
                            <input
                                className="password-input"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                name="confirmPassword"
                                tabIndex={0}
                                defaultValue=""
                                required
                            />
                            <span
                                className="show-pass"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <i className="icon-eye view"></i>
                                <i className="icon-eye-off hide"></i>
                            </span>
                        </fieldset>

                        <button
                            type="submit"
                            className="tf-button w-full"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>

                    <div className="bottom body-text text-center text-white w-full">
                        Already have account?
                        <a href="/login" className="body-text tf-color">
                            {" "}
                            Sign in here
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
