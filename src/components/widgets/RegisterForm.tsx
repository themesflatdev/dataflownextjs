"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const firstName = String(formData.get("firstName") || "");
        const lastName = String(formData.get("lastName") || "");
        const email = String(formData.get("email") || "");
        const password = String(formData.get("password") || "");
        const confirmPassword = String(formData.get("confirmPassword") || "");

        if (!agree) {
            alert("Please agree with Privacy Policy");
            return;
        }

        if (password !== confirmPassword) {
            alert("Confirm password does not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Register failed");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="left">
                <Image
                    width={960}
                    height={919}
                    src="/images/images-section/sign-up.jpg"
                    alt="image"
                />
            </div>

            <div className="right">
                <div className="login-box">
                    <div>
                        <h3 className="mb-10">Create your account</h3>
                        <div className="body-text text-white">
                            Enter your personal details to create account
                        </div>
                    </div>

                    <form
                        className="form-login flex flex-column gap22 w-full"
                        onSubmit={handleSubmit}
                    >
                        <fieldset className="name">
                            <div className="body-title mb-10 text-white">
                                Your name <span className="tf-color-1">*</span>
                            </div>
                            <div className="cols gap10">
                                <input
                                    className="flex-grow sm-mb-10"
                                    type="text"
                                    placeholder="First name"
                                    name="firstName"
                                    defaultValue=""
                                    required
                                />
                                <input
                                    className="flex-grow"
                                    type="text"
                                    placeholder="Last name"
                                    name="lastName"
                                    defaultValue=""
                                    required
                                />
                            </div>
                        </fieldset>

                        <fieldset className="email">
                            <div className="body-title mb-10 text-white">
                                Email address{" "}
                                <span className="tf-color-1">*</span>
                            </div>
                            <input
                                className="flex-grow"
                                type="email"
                                placeholder="Enter your email address"
                                name="email"
                                defaultValue=""
                                required
                            />
                        </fieldset>

                        <fieldset className="password">
                            <div className="body-title mb-10 text-white">
                                Password <span className="tf-color-1">*</span>
                            </div>
                            <input
                                className="password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                name="password"
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
                                Confirm password{" "}
                                <span className="tf-color-1">*</span>
                            </div>
                            <input
                                className="password-input"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                name="confirmPassword"
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

                        <div className="flex gap10 items-center">
                            <input
                                className="tf-check"
                                type="checkbox"
                                id="agree"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            <label
                                className="body-text text-surface-3"
                                htmlFor="agree"
                            >
                                Agree with Privacy Policy
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="tf-button w-full"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Register"}
                        </button>
                    </form>

                    <div className="flex flex-column gap16 w-full">
                        <div className="flex gap40 items-center">
                            <div className="line"></div>
                            <div className="body-text text-white text-center flex-shrink-0">
                                Or Sign in with
                            </div>
                            <div className="line"></div>
                        </div>

                        <a href="/" className="tf-btn-2">
                            <span>Sign in with Google</span>
                        </a>

                        <a href="/" className="tf-btn-2">
                            <span>Sign in with Facebook</span>
                        </a>
                    </div>

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
