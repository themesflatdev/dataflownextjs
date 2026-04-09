"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") || "");

        console.log("forgot password email:", email);

        setTimeout(() => {
            setLoading(false);
            alert("Reset link sent successfully");
            router.push("/reset-password");
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
                            <h3>Forgot your password</h3>
                            <div className="body-text text-white">
                                Enter your email address and we will help you
                                reset your password
                            </div>
                        </div>

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
                                tabIndex={0}
                                defaultValue=""
                                required
                            />
                        </fieldset>

                        <button
                            type="submit"
                            className="tf-button w-full"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Send reset link"}
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
