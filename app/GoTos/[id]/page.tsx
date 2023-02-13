"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import Personnel from '../../Components/Personnel';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function goTo ({ params }: any) {
    const [id, setId] = useState(parseInt(params.id))
    const { goTos, setGoTos } = useGlobalContext();
    const [goTosLoading, setGoTosLoading] = useState(true)
    const thisGoTo = goTos.find((i)=>i.id===id)

    console.log(goTos)

    useEffect(()=>{
        if(goTos.length>1)
        setGoTosLoading(true)
        console.log('recalled api')
        getGoTos()
    },[])


    async function getGoTos(){
      try {
        const res = await fetch(`/api/getGoTos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        setGoTos(await res.json())
    } catch (error) {
        console.error(error);
    } finally {
        setGoTosLoading(false);
    }
  }

    return (
        <>
        <div className='flex justify-center px-16 flex-col py-12 lg:py-16'>
        <h1 className='text-2xl py-4'>My Go-To's</h1>
        {goTosLoading ? <div>Loading..</div> : <div>{thisGoTo.roles.map((role)=>{
            return <Personnel goToId={id} role={role.name} people={role.people}/>
        })}</div>}
    </div>
    </>
    )

}