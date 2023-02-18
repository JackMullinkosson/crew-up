"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import RoleDetails from '@/app/Components/RoleDetails';

export default function goTo ({ params }: any) {
    const [id, setId] = useState(parseInt(params.id))
    const { goTos, setGoTos } = useGlobalContext();
    const { people, setPeople } = useGlobalContext();
    const [goTosLoading, setGoTosLoading] = useState(true)
    const [peopleLoading, setPeopleLoading] = useState(true)
    const thisGoTo = goTos.find((i)=>i.id===id) 
  
    useEffect(()=>{
        getGoTos()
        getPeople()
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
        setGoTosLoading(false);
    } catch (error) {
        console.error(error);
    } 
  }

  async function getPeople(){
    try {
       setPeopleLoading(true) 
      const res = await fetch(`/api/getPeople`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      });
      setPeople(await res.json())
      setPeopleLoading(false)
  } catch (error) {
      console.error(error);
  }
}


return (
  <>
    <div className='flex justify-center px-16 flex-col py-12 lg:py-16'>
      <h1 className='text-2xl py-4'>My Go-To's</h1>
      {goTosLoading ? (
        <div>Loading..</div>
      ) : (
        <div>
          {thisGoTo.roles.map((role) => {
            return <RoleDetails id={role.id} name={role.name} goToId={thisGoTo.id} peopleLoading={peopleLoading}/>
          })}
        </div>
      )}
    </div>
  </>
);


}