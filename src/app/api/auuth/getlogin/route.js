import Database from "@/database";
import AuthModel from "@/model/authmodel";
import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";


const secrearekey="poweredby@gobus.com";
export async function GET(req){
    try{
        await Database();
        const tokenCookeei=req.cookies.get("session_token");
        if(!tokenCookeei){
            return NextResponse.json({
                status:400,
                message:"Token Cookies Not provided...",
            })
        }
        const TokenValue=tokenCookeei.value;
        console.log("Token value is ",TokenValue);


        // veryfy the token
        const decode=JWT.verify(TokenValue,secrearekey);
        if(!decode){
            return NextResponse.json({
                status:404,
                message:"Not token id will be provided or we cannot found...",
            })
        }

        // get user
        const user=await AuthModel.findById(decode.id);
        if(!user){
            return NextResponse.json({
                status:404,
                message:"User and user id not found...",
            })
        };

        return NextResponse.json({
            status:200,
            message:user,
        })

        
    }catch(err){
        return NextResponse.json({
            status:500,
            message:"Authenticated Error...",
        })
    }
}