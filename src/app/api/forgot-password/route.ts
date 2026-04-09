import { NextResponse } from "next/server";
import crypto from "crypto";

// Giả lập DB
type User = {
  id: string;
  email: string;
};

const fakeUsers: User[] = [
  { id: "1", email: "admin@gmail.com" },
];

type ResetTokenRecord = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

const resetTokenStore: ResetTokenRecord[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "If the email exists, a reset link will be sent." },
        { status: 200 }
      );
    }

    const user = fakeUsers.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: "If the email exists, a reset link will be sent." },
        { status: 200 }
      );
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 phút

    for (let i = resetTokenStore.length - 1; i >= 0; i--) {
      if (resetTokenStore[i].userId === user.id) {
        resetTokenStore.splice(i, 1);
      }
    }

    resetTokenStore.push({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const resetLink = `${appUrl}/reset-password?token=${rawToken}`;

    console.log("RESET LINK:", resetLink);

    return NextResponse.json(
      { message: "If the email exists, a reset link will be sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export { resetTokenStore, fakeUsers };