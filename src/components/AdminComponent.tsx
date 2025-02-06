"use client"
import React, { useEffect } from 'react'
import {useUser} from "@clerk/nextjs"
import { useRouter } from 'next/navigation';

function AdminComponent() {


const {isLoaded,user}=useUser();
const router= useRouter();


useEffect(()=>{
    if(isLoaded ){

        const role = (user?.publicMetadata as {role?:string})?.role;
        if(!user || role !== "admin"){
        
        router.push("/")
        }
        
    }
},[isLoaded,user,router])


  return (
    <div className='text-2xl h-screen w-full flex justify-center'>AdminComponent</div>
  )
}

export default AdminComponent