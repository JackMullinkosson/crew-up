"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '.././Context/store';
import Personnel from '../Components/Personnel';

export default function GoTos() {

    const roles = ['Gaffer', 'BBE', 'Electric', 'Key Grip', 'BBG', 'Grip', 'Camera Operator', 'First AC', 'Second AC', 'Camera Utility' ]

    return (
        <>
        <div className='flex justify-center px-16 flex-col py-8'>
        <h1 className='text-2xl py-4'>My Go-To's</h1>
        {
        roles.map((role)=>{
            return <Personnel role={role}/>
        })
    }
    </div>
    </>
    )

}