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
    const thisGoTo = goTos.find((i)=>i.id===id)
    const [tempId, setTempId] = useState()
   
    console.log(people)
    useEffect(()=>{
    console.log('this was called')
     getTempId()
    },[goTos])
  

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


function getTempId(){
 const arrOfIds = []
 const arrOfPeople = []
  for (const goTo of goTos) {
    for (const role of goTo.roles) {
      for (const person of role.people) {
        arrOfIds.push(person.id);
        arrOfPeople.push(person)
      }
    }
  }
  arrOfIds.sort((a, b)=>b-a)
  if(arrOfIds.length<1){
    arrOfIds.push(0)
  }
  setTempId(arrOfIds[0])
  setPeople(arrOfPeople)
}


//<Personnel key={String(role.id)} goToId={id} role={role.name} people={role.people} roleId={role.id} tempId={tempId}/>




return (
  <>
    <div className='flex justify-center px-16 flex-col py-12 lg:py-16'>
      <h1 className='text-2xl py-4'>My Go-To's</h1>
      {goTosLoading ? (
        <div>Loading..</div>
      ) : (
        <div>
          {thisGoTo.roles.map((role) => {
            return <RoleDetails id={role.id} name={role.name} tempId={tempId} goToId={thisGoTo.id}/>
          })}
        </div>
      )}
    </div>
  </>
);


}