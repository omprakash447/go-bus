"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const StatemanageofGoBus=createContext();


export const Gobusprovider=({children})=>{
    const router=useRouter();
    const []=useState([]);
    const [loggedin , setloggedin]=useState(false);
    useEffect(()=>{
        const Loggeduser=localStorage.getItem("user");
        if(Loggeduser){
            setloggedin(true);
            router.push("/");
        }else{
            router.push("/verification/login");
        }
    },[]);
    return (
        <StatemanageofGoBus.Provider value={{loggedin , setloggedin}}>
            {children}
        </StatemanageofGoBus.Provider>
    )
};

export const Gobus=()=> useContext(StatemanageofGoBus);