import Database from "@/database";
import AuthModel from "@/model/authmodel";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";

const secretKey = "poweredby@gobus.com";

export async function POST(req) {
    try {
        await Database();
        const { email, password } = await req.json();

        // Find user
        const user = await AuthModel.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 401 } // 👈 Now it correctly sets the 401 Unauthorized status
            );
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 } // 👈 Correctly returning 401 for wrong credentials
            );
        }

        // Generate JWT token
        const token = JWT.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

        // Create response and set cookie
        const response = NextResponse.json(
            { message: "Login successful." },
            { status: 200 }
        );

        response.cookies.set("session_token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 31_536_000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            { error: "An error occurred during login." },
            { status: 500 }
        );
    }
}
