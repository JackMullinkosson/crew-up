"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import Personnel from '../../Components/Personnel';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function goTo ({ params }: any) {
    const [id, setId] = useState(parseInt(params.id))
    const { roles, setRoles } = useGlobalContext();
    const [rolesLoading, setRolesLoading] = useState(true)

    useEffect(()=>{
        setRolesLoading(true)
        getRoles()
    },[])

    async function getRoles (){
        try {
            const res = await fetch(`/api/getRoles`,{
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

console.log(roles)

    return (
        <>
        <div className='flex justify-center px-16 flex-col py-12 lg:py-16'>
        <h1 className='text-2xl py-4'>My Go-To's</h1>
        {rolesLoading ? <div>Loading..</div> : <div>{roles.map((role)=>{
            return <Personnel role={role.name} people={role.people}/>
        })}</div>}
    </div>
    </>
    )

}