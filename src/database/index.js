import mongoose from "mongoose";
import { NextResponse } from "next/server";



export default function Database(){
    try{
        const url="mongodb://localhost:27017/GOBUS";
        mongoose.connect(url)
        .then(()=>{
            console.log("connected to database...");
        })
        .catch((err)=>{
            console.log(err);
        })
    }catch(err){
        return NextResponse.json({
            status:500,
            message:err,
        })
    }
}