import Database from "@/database";
import BusBookingModel from "@/model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await Database();
        const { bus, from, to, distance, price } = await req.json();

        if (!bus || !from || !to || !distance || !price) {
            return NextResponse.json({
                status: 400,
                message: "Missing required fields.",
            });
        }

        const booking = await BusBookingModel.create({ bus, from, to, distance, price });

        if (booking) {
            return NextResponse.json({
                status: 201,
                message: "Booking is created.",
                booking,
            });
        } else {
            return NextResponse.json({
                status: 500,
                message: "Failed to create booking.",
            });
        }
    } catch (err) {
        return NextResponse.json({
            status: 500,
            message: err.message || "An error occurred",
        });
    }
}
