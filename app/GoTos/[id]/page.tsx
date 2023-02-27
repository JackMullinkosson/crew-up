"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ClipLoader } from 'react-spinners';
import RoleDetails from '@/app/GoTos/[id]/RoleDetails';

export default function goTo ({ params }: any) {
    const [id, setId] = useState(parseInt(params.id))
    const {goTos, setGoTos, roles, setRoles, people, setPeople } = useGlobalContext();
    const [goTosLoading, setGoTosLoading] = useState(true)
    const [peopleLoading, setPeopleLoading] = useState(true)
    const [rolesLoading, setRolesLoading] = useState(true)
    const [isCreatingRow, setIsCreatingRow] = useState(false)
    const [tempId, setTempId] = useState<number>()
    const [name, setName] = useState('')
    const thisGoTo = goTos.find(i=> i.id===id)
    const successButtonStyles = "mr-2 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:cursor-not-allowed"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    const newRowStyles = "flex flex-row items-center py-4 mb-4 w-full justify-between"
    const addRowStyles = "flex flex-row w-1/4 items-center justify-between bg-white border px-4 py-4 mb-4"
    const inputStyles = "w-1/2 appearance-none bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"

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

    useEffect(()=>{
      getTempId()
     },[roles])

    function getTempId(){
      const arrOfIds = []
      for (const role of roles) {
            arrOfIds.push(role.id);
          }
        arrOfIds.sort((a, b)=>b-a)
        if(arrOfIds.length<1){
        arrOfIds.push(0)
      }
      setTempId(arrOfIds[0])
    }

async function addRole(){
  let newTempId = tempId+1
  const newRole = {
    name: name,
    goToId: id,
    id: newTempId,
    people: []
  }
  let updatedRoles = [...roles]
  updatedRoles.push(newRole)
  setRoles(updatedRoles)
  setName("")
  setIsCreatingRow(false)
  let res;
  try{
     res = await fetch(`/api/createRole`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({
        name: name,
        goToId: id
    })
    })
  }
  catch (error) {
    console.error(error);
  }
  finally{
    let resRole = await res.json()
    console.log(resRole)
    let resRoles = [...roles]
    resRoles.push(resRole)
    console.log(resRoles)
    setRoles(resRoles)
  }
}


return (
    <div className='flex justify-center px-16 flex-col py-12 lg:py-16'>
      <h1 className='text-4xl py-4'>{goTosLoading ? 'Loading...' : thisGoTo.name}</h1>
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
          {isCreatingRow ? 
          <div className={addRowStyles}>
            <input className={inputStyles} value={name} placeholder='Role Name' onChange={(e)=>setName(e.target.value)}/>
            <button className={infoButtonStyles} onClick={()=>addRole()}>Add</button>
            <XMarkIcon className='w-6 h-6 hover:cursor-pointer' onClick={()=>setIsCreatingRow(false)}/>
          </div> 
          : <div className={newRowStyles}>
              <button className={`${successButtonStyles} disabled:cursor-not-allowed`} disabled={isCreatingRow} onClick={()=>setIsCreatingRow(true)}><PlusIcon className='h-6 w-6'/>Add Role</button>
            </div>} 
          {roles.map((role) => {
            if (role.goToId === id)
            return <RoleDetails key={String(role.id)} id={role.id} roleName={role.name} goToId={id} peopleLoading={peopleLoading}/>
          })}
        </div>
      )}
    </div>
);


}