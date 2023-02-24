"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { ClipLoader } from 'react-spinners';
import RoleDetails from '@/app/Components/RoleDetails';

export default function goTo ({ params }: any) {
    const [id, setId] = useState(parseInt(params.id))
    const {goTos, setGoTos, roles, setRoles, people, setPeople } = useGlobalContext();
    const [goTosLoading, setGoTosLoading] = useState(true)
    const [peopleLoading, setPeopleLoading] = useState(true)
    const [rolesLoading, setRolesLoading] = useState(true)
    const thisGoTo = goTos.find(i=> i.id===id)
    const successButtonStyles = "mr-2 mt-4 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2 disabled:cursor-not-allowed"
    const newRowStyles = "flex flex-row py-2 w-full justify-between"


    
    useEffect(()=>{
        getGoTos()
        getRoles()
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

    async function getRoles(){
      try {
        const res = await fetch(`/api/getRoles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        setRoles(await res.json())
        setRolesLoading(false);
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

function handleAddRowClick(){
  console.log('add')
}


return (
  <>
    <div className='flex justify-center px-16 flex-col py-12 lg:py-16'>
      <h1 className='text-2xl py-4'>{goTosLoading ? 'Loading...' : thisGoTo.name}</h1>
      {rolesLoading || goTosLoading ? (
        <>
          <div className={newRowStyles}>
            <button className={`${successButtonStyles} disabled:cursor-not-allowed`} disabled={true}><PlusIcon className='h-6 w-6'/>Add Role</button>
          </div>  
          <div className="flex flex-col py-3 bg-gray-50 hover:bg-white rounded border hover:cursor-pointer">
            <h1 className='text-2xl px-4 py-2 hover:cursor-pointer'><ClipLoader size={40} color={'black'}/></h1>
          </div>
        </>
      ) : (
        <div>
          <div className={newRowStyles}>
            <button className={`${successButtonStyles} disabled:cursor-not-allowed`} disabled={false}><PlusIcon className='h-6 w-6'/>Add Role</button>
          </div>  
          {roles.map((role) => {
            if (role.goToId === id)
            return <RoleDetails id={role.id} roleName={role.name} goToId={id} peopleLoading={peopleLoading}/>
          })}
        </div>
      )}
    </div>
  </>
);


}