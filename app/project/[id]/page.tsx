"use client"

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ClipLoader } from 'react-spinners';
import ProjectRoleDetails from '@/app/Components/RoleDetails';
import moment from 'moment';

export default function project ({ params }: any) { 
    const [id, setId] = useState(parseInt(params.id))
    const {projects, setProjects, goTos, setGoTos, people, setPeople } = useGlobalContext();
    const [projectsLoading, setProjectsLoading] = useState(true)
    const [goTosLoading, setGoTosLoading] = useState(true)
    const [peopleLoading, setPeopleLoading] = useState(true)
    const [goToChoice, setGoToChoice] = useState("")
    const thisProject = projects.find((i)=>i.id===id)
    const thisGoTo = goTos.find((i)=>i.name===goToChoice)
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    
    console.log(thisGoTo)

    useEffect(() => {
        getProjects()
        getGoTos()
      }, []);

    useEffect(()=>{
        if(goToChoice==="") return
        getPeople()
    },[goToChoice])

    function handleChoice(e){
        setGoToChoice(e.value)
    }
   

    async function getProjects(){
      try {
        setProjectsLoading(true)
          const res = await fetch(`/api/getProjects`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          });
          setProjects(await res.json())
          setProjectsLoading(false)
      } catch (error) {
          console.error(error);
      }
  }

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


return(
    <main className='flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24'>
        {projectsLoading ? <p>Loading...</p> : 
        (<><div className='w-full py-6 flex flex-row justify-evenly items-center w-full flex-shrink-0 h-20 h-fit'>
        <h1 className='text-4xl bold'>{thisProject.name}</h1>
        <p className='mx-16 text-lg'>{thisProject.logLine}</p>
        <p className="text-gray-500 dark:text-gray-400">{moment(thisProject.startDate).format("MMMM Do YYYY")} - {moment(thisProject.endDate).format("MMMM Do YYYY")}</p>
        </div>
        <div className="w-3/4 py-6 flex flex-row justify-center items-center">
            <div>
        <label className={labelStyles}>Choose Go-To List</label>
            <div className="flex"><select className="flex appearance-none bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 pr-12 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={(e)=>handleChoice(e.target)} >
                <option value="" disabled selected>Select option</option>
                {goTosLoading ? <>Loading...</>:
                goTos.map((goTo)=>{
                    return(
                        <option value={String(goTo.name)}>{goTo.name}</option>
                    )
                })}
             </select>
             <ChevronDownIcon className="h-8 w-6 -ml-10 mt-2 postion-absolute"/>
             </div>
             </div>
             <div className='px-16'>
                <p>Once you choose a go-to list, you will be able to customize it for this specific project. Any changes you make will be saved to this project's page, but won't affect the original list.</p>
             </div>
        </div>
        {goToChoice==="" ? null : <div className='w-5/6 pt-3 pb-1'>
        {goTosLoading ?  <><ClipLoader size={40} color={'black'}/></> : (<>
        {thisGoTo.roles.map((role) => {
            return <ProjectRoleDetails id={role.id} roleName={role.name} goToId={thisGoTo.id} peopleLoading={peopleLoading}/>
          })}</>) }
        </div>}
        </>)}
    </main>
)

}