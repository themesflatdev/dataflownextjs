import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginBody;

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter email and password" },
        { status: 400 }
      );
    }

    // Demo login
    if (email !== "admin@gmail.com" || password !== "123456") {
      return NextResponse.json(
        { message: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("admin_token", "demo_admin_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("LOGIN_ERROR", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}