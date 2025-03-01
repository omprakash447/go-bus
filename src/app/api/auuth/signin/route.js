import Database from "@/database";
import AuthModel from "@/model/authmodel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await Database();
        const { name, email, password } = await req.json();

        // Check if all fields are provided
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Please provide all required fields." },
                { status: 400 } // 400 Bad Request
            );
        }

        // Check if user already exists
        const existingUser = await AuthModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists." },
                { status: 409 } // 409 Conflict
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await AuthModel.create({ name, email, password: hashedPassword });

        if (user) {
            return NextResponse.json(
                { message: "User created successfully.", userId: user._id },
                { status: 201 } // 201 Created
            );
        } else {
            return NextResponse.json(
                { error: "User creation failed." },
                { status: 500 } // 500 Internal Server Error
            );
        }
    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json(
            { error: "An error occurred while creating the user." },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
