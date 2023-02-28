"use client"

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { ClipLoader } from 'react-spinners';
import ProjectRoleDetails from '@/app/GoTos/[id]/RoleDetails';
import moment from 'moment';

interface Project {
    name: String;
    id: Number;
    startDate: Date;
    endDate: Date;
  }

interface GoTo {
    name: String;
    id: Number;
    icon: Number;
    defaultGoTo: Boolean;
    projectId: Number;
    roles: Role[]
  }

interface Role {
    name: String;
    id: Number;
    goToId: Number;
  }

  

export default function project ({id}) { 
    const [project, setProject] = useState<Project>({ name: "", id: 0, startDate: new Date(), endDate: new Date() });
    const {goTos, setGoTos, people, setPeople, roles, setRoles } = useGlobalContext();
    const [projectsLoading, setProjectsLoading] = useState(true)
    const [goTosLoading, setGoTosLoading] = useState(true)
    const [peopleLoading, setPeopleLoading] = useState(true)
    const [goToChoice, setGoToChoice] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [thesePeople, setThesePeople] = useState([])
    const [isCreatingRow, setIsCreatingRow] = useState(false)
    const [name, setName] = useState('')
    const [assignedGoTo, setAssignedGoTo] = useState<GoTo>()
    const [isAssigning, setIsAssigning] = useState(false)
    const [isAssigned, setIsAssigned] = useState(false)
    const thisGoTo = goTos.find((i)=>i?.projectId===id)
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const successLabelStyles = "h-6 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex flex-row items-center text-teal-500"
    const dangerLabelStyles = "h-6 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex flex-row items-center text-red-500"
    const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:cursor-not-allowed"
    const infoButtonStyles = "text-xl flex-shrink-0 flex items-center bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 border-4 text-white py-1 px-2 rounded"
    const newRowStyles = "flex flex-row items-center py-4 mt-2 w-full justify-between"
    const addRowStyles = "flex flex-row w-1/4 items-center mt-2 justify-between bg-white border px-4 py-4 mb-4"
    const inputStyles = "appearance-none w-1/2 bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"

    useEffect(()=>{
        const res = goTos.find((i)=>i?.projectId===id)
        setAssignedGoTo(res)
        console.log('on page load', assignedGoTo)
        if(assignedGoTo){
            setIsAssigned(true)
            setIsAssigning(false)
            console.log(assignedGoTo)
        }
    },[goTos])

    useEffect(()=>{
        if(!assignedGoTo) return
        if(assignedGoTo.name.length>0){
            setIsLoading(false)
        }
    },[assignedGoTo])


    useEffect(() => {
        getProject()
        getGoTos()
        getPeople()
      }, []);

    useEffect(()=>{
        if (!assignedGoTo || !assignedGoTo.id) return
        let newPeople = []
        for (const person of people){
            if (person.goToId === assignedGoTo.id)
            newPeople.push(person)
        }
        setThesePeople(newPeople)
    },[assignedGoTo])


    function handleChoice(e){
        const choice = goTos.find((i)=>i.name===e.value)
        setAssignedGoTo(choice)
    }

    function handleAssignGoToList(){
        console.log('this is what the goto is rn', thisGoTo)
        createProjGoTo()
    }

   

    async function createProjGoTo(){
        setPeople(thesePeople)
        setIsAssigned(true)
        console.log(assignedGoTo)
        let res;
          try{
            setIsAssigning(true) 
             res = await fetch(`/api/createProjGoTo`,{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                thisGoTo: assignedGoTo,
                roles: assignedGoTo.roles,
                people: thesePeople,
                projectName: project.name,
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
          finally{
          setIsAssigning(false)
          let {updatedGoTo} = await res.json()
          let resGoTos = [...goTos]
          resGoTos.push(updatedGoTo) 
          setGoTos(resGoTos)
          }
        }
   

    async function getProject(){
      try {
        setProjectsLoading(true)
          const res = await fetch(`/api/getProjectById/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          });
          setProject(await res.json())
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
        (<>
        <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
            <h1 className='text-6xl font-bold'>{project.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 ml-6 w-1/2">{moment(project.startDate).format("MMMM Do YYYY")} - {moment(project.endDate).format("MMMM Do YYYY")}</p>
        </div>
        {isAssigned ? null : 
        (<div className="w-3/4 py-6 flex flex-row justify-evenly items-center">
            <div>
                <label className={labelStyles}>Choose Go-To List</label>
                <div className="flex flex-col">
                    <select className="flex px-4 appearance-none bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 pr-12 mb-3 leading-tight focus:outline-none focus:bg-white hover:cursor-pointer" onChange={(e)=>handleChoice(e.target)} >
                        <option value="" disabled selected>Select option</option>
                        {goTosLoading ? <>Loading...</> : goTos.map((goTo)=>{
                        if(goTo.defaultGoTo) return(<option key={String(goTo.id)} value={String(goTo.name)}>{goTo.name}</option>)})}
                    </select>
                    <button className={successButtonStyles} onClick={()=>handleAssignGoToList()}>{isAssigning ? <ClipLoader size={27} color={'white'}/> : 'Assign Go-To'}</button>
                </div>
             </div>
             <div className='ml-6 w-1/2'>
                <p>Once you assign a go-to list to this project, you will be able to customize it. Your changes will not affect the original list.</p>
             </div>
        </div>)}
        </>)}
    </main>
)

}