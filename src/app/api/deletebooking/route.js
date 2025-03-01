import Database from "@/database";
import BusBookingModel from "@/model";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try{
        await Database();
        const {id}=await req.json();
        if(!id){
            return NextResponse.json({
                status:404,
                message:"plz provide the id to the database",
            })
        }

        const findByid=await BusBookingModel.findByIdAndDelete(id);
        if(!findByid){
            return NextResponse.json({
                status:404,
                message:"id is notfound...",
            })
        }

        return NextResponse.json({
            status:200,
            message:"data deleted...",
        })
    }catch(err){
        return NextResponse.json({
            status:500,
            message:err
        })
    }
}