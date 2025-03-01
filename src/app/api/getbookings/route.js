import Database from "@/database"; // Make sure to import the Database connection
import BusBookingModel from "@/model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await Database(); // Ensure database connection
        const findbooking = await BusBookingModel.find({});

        if (findbooking.length > 0) {  // Check if there are bookings in the database
            return NextResponse.json({
                status: 200,
                message: findbooking,  // Return the bookings found
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: "No bookings found.",
            });
        }
    } catch (err) {
        return NextResponse.json({
            status: 500,
            message: err.message || "Internal server error",
        });
    }
}
