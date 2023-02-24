"use client"

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { ChevronDownIcon, PlusIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
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
    const [isPosting, setIsPosting] = useState(false)
    const thisProject = projects.find((i)=>i.id===id)
    const thisGoTo = goTos.find((i)=>i.name===goToChoice)
    const [thesePeople, setThesePeople] = useState([])
    const [isCreatingRow, setIsCreatingRow] = useState(false)
    const [name, setName] = useState('')
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const successButtonStyles = "mr-2 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:cursor-not-allowed"
    const infoButtonStyles = "text-xl flex-shrink-0 flex items-center bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 border-4 text-white py-1 px-2 rounded"
    const newRowStyles = "flex flex-row items-center py-4 mb-4 w-full justify-between"
    const addRowStyles = "flex flex-row w-1/4 items-center justify-between bg-white border px-4 py-4 mb-4"
    const inputStyles = "appearance-none w-1/2 bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"


    useEffect(() => {
        getProjects()
        getGoTos()
        getPeople()
      }, []);

    useEffect(()=>{
        let newPeople = []
        for (const person of people){
            if (person.goToId === thisGoTo.id)
            newPeople.push(person)
        }
        setThesePeople(newPeople)
    },[goToChoice])


    function handleChoice(e){
        setGoToChoice(e.value)
    }

    async function addRole(){
        console.log('hi')
    }

    async function createProjGoTo(){
        let res;
          try{
            setIsPosting(true) 
             res = await fetch(`/api/createProjGoTo`,{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                thisGoTo: thisGoTo,
                roles: thisGoTo.roles,
                people: thesePeople,
                projectName: thisProject.name,
                projectId: id,
                defaultGoTo: false
              })
            })
            if (res.status !== 200) {
              console.log('error making new go to list')
            } 
          }
          catch(e){
            console.error(e)
          }
          console.log(await res.json())
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
    let res;
    try {
      setPeopleLoading(true) 
       res = await fetch(`/api/getPeople`, {
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
                <p>Once you choose a go-to list, you will be able to customize it for this specific project. Your changes will not affect your original list.</p>
             </div>
        </div>
        {goToChoice==="" ? null : <div className='w-5/6 pt-3 pb-1'>
        {goTosLoading ?  <><ClipLoader size={40} color={'black'}/></> : (<>
        <div className={newRowStyles}>
            <button className={`${infoButtonStyles} disabled:cursor-not-allowed`}><CheckIcon className='h-6 w-6'/>Save Changes</button>
        </div>  
        {thisGoTo.roles.map((role) => {
            return <ProjectRoleDetails key={String(role.id)} id={role.id} roleName={role.name} goToId={thisGoTo.id} peopleLoading={peopleLoading}/>
          })}
          {isCreatingRow ? 
          <div className={addRowStyles}>
            <input className={inputStyles} value={name} placeholder='Role Name' onChange={(e)=>setName(e.target.value)}/>
            <button className={successButtonStyles} onClick={()=>addRole()}>Add</button>
            <XMarkIcon className='w-6 h-6 hover:cursor-pointer' onClick={()=>setIsCreatingRow(false)}/>
          </div> 
          : <div className={newRowStyles}>
              <button className={`${successButtonStyles} disabled:cursor-not-allowed`} disabled={isCreatingRow} onClick={()=>setIsCreatingRow(true)}><PlusIcon className='h-6 w-6'/>Add Role</button>
            </div>} 
          </>) }
        </div>}
        </>)}
    </main>
)

}