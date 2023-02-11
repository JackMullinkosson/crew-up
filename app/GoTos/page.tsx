"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '.././Context/store';
import Personnel from '../Components/Personnel';

export default function GoTos() {

    const defaultRoles = ['Gaffer', 'BBE', 'Electric', 'Key Grip', 'BBG', 'Grip', 'Camera Operator', 'First AC', 'Second AC', 'Camera Utility' ]
    const { roles, setRoles } = useGlobalContext();
    const [rolesLoading, setRolesLoading] = useState(true)

    useEffect(()=>{
        setRolesLoading(true)
        getGoTos()
    },[])

    async function getGoTos (){
        try {
            const res = await fetch(`/api/getGoTos`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            })
            setRoles(await res.json())
        }
        catch(e){
            console.error(e)
        }
        finally{
            setRolesLoading(false)
        }
    }



    return (
        <>
        <div className='flex justify-center px-16 flex-col py-8'>
        <h1 className='text-2xl py-4'>My Go-To's</h1>
        {rolesLoading ? <div>Loading..</div> : <div>{roles.map((role)=>{
            return <Personnel role={role.name} people={role.people}/>
        })}</div>}
    </div>
    </>
    )

}