"use client"
import { PlusIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import { ClipLoader } from 'react-spinners';
import RoleDetails from '@/app/Components/RoleDetails';
import moment from 'moment';
import goTo from '../GoTos/[id]/page';

const newRowStyles = "flex flex-row items-center py-4 mt-2 w-full justify-between"
const addRowStyles = "flex flex-row w-1/4 items-center mt-2 justify-between bg-white border px-4 py-4 mb-4"
const inputStyles = "appearance-none w-1/2 bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"
const successLabelStyles = "h-6 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex flex-row items-center text-teal-500"
const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:cursor-not-allowed"
const infoButtonStyles = "py-1 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-m border-4 text-white px-2 rounded"
const toastStyles = "flex items-center w-full max-w-xs p-4 bg-white rounded-lg shadow-lg shadow-blue-400"

interface Project {
    name: String;
    id: Number;
    startDate: Date;
    endDate: Date;
  }

const Assigned = ({id}) => {
    const {people, setPeople, roles, setRoles, setIsPosting, isPosting } = useGlobalContext();
    const [projectLoading, setProjectLoading] = useState(true)
    const [goToLoading, setGoToLoading] = useState(true)
    const [isCreatingRow, setIsCreatingRow] = useState(false)
    const [isCrewingUp, setIsCrewingUp] = useState(false)
    const [name, setName] = useState('')
    const [project, setProject] = useState<Project>({ name: "", id: 0, startDate: new Date(), endDate: new Date() });
    const [goToId, setGoToId] = useState<Number>()
    const [ownerId, setOwnerId] = useState<Number>()
    const [tempId, setTempId] = useState<number>()
    const [crewedUp, setCrewedUp] = useState<boolean>()
    const [showToast, setShowToast] = useState(false)
   

    useEffect(()=>{
        setPeople(null)
        setRoles(null)
        getProjectById()
        getGoToById()
    },[])


    useEffect(()=>{
      if(roles){
        getTempId()
      }
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

    useEffect(()=>{
      if(!showToast) return
      setTimeout(() => {
        setShowToast(false)
      }, 4500);
    },[showToast])

    async function getProjectById(){
        try {
            const res = await fetch(`/api/getProjectById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });
            const project = await res.json()
            setProject(project)
            setCrewedUp(project.crewedUp)
        } catch (error) {
            console.error(error);
        }
        finally{
            setProjectLoading(false)
        }
    }

    async function getGoToById() {
        let res;
        let goTo;
        while (true) {
          try {
            res = await fetch(`/api/getGoToById/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            goTo = await res.json();
            if (goTo && goTo.roles && goTo.people && goTo.ownerId && goTo.people.length>0) {
              break;
            }
          } catch (e) {
            console.error(e);
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
            setGoToId(goTo.id);
            setOwnerId(goTo.ownerId)
            setPeople(goTo.people);
            setRoles(goTo.roles);
            setGoToLoading(false)
    }

    async function addRole(){
        let newTempId = tempId+1
        const newRole = {
          name: name,
          goToId: goToId,
          id: newTempId,
          people: []
        }
        let updatedRoles = [...roles]
        updatedRoles.push(newRole)
        setRoles(updatedRoles)
        setName("")
        setIsCreatingRow(false)
        setIsPosting(true)
        let res;
        try{
           res = await fetch(`/api/createRole`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",  
            },
            body: JSON.stringify({
              name: name,
              goToId: goToId
          })
          })
        }
        catch (error) {
          console.error(error);
        }
        finally{
          let resRole = await res.json()
          let resRoles = [...roles]
          resRoles.push(resRole)
          setRoles(resRoles)
          setIsPosting(false)
        }
      }
  
  function handleCrewUp(){
    setIsPosting(true)
    setIsCrewingUp(true)
    contactCrew()
    addStatusToPeople()
  }

  async function contactCrew(){
    let res;
    try{
      res = await fetch(`/api/contact`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify({
          project: project,
          ownerId: ownerId,
          people: people
      })
      })
    }
    catch(e){
      console.error(e)
    }
  }

  async function addStatusToPeople(){
    let res;
    try{
      res = await fetch(`/api/addStatusToPeople`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify({
          people: people
      })
      })
    }
    catch(e){
      console.error(e)
    }
    finally{
      const resPeople = await res.json()
      setPeople(resPeople)
      setShowToast(true)
      setCrewedUp(true)
      setIsPosting(false)
      setIsCrewingUp(false)
      window.scrollTo(0, 0)
    }
  }
      


return (

    <main className='flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24'>
      {showToast ? <div className='fixed top-20 left-1/3'>
                      <div className={toastStyles}>
                      <CheckIcon className='h-8 w-8 text-green-500'/>
                      <p>Success! Offers have been sent.</p>
                      <XMarkIcon onClick={()=>setShowToast(false)} className='h-6 w-6 -mr-2 ml-auto text-gray-400 hover:cursor-pointer'/>
                      </div>
                   </div> : null}
    {projectLoading ? 
        (<div className="w-3/4 py-6 flex flex-row items-center">
        <ClipLoader size={35} color={'black'}/>
        </div>) :    
        (<div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
            <h1 className='text-6xl font-bold'>{project.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 ml-6 w-1/2">{moment(project.startDate).format("MMMM Do YYYY")} - {moment(project.endDate).format("MMMM Do YYYY")}</p>
        </div>)}
    <div className='w-5/6 pt-3 pb-1'>
        <>
            <div className={newRowStyles}>
                {isPosting ?
                    (<div className='flex ml-4 items-center'><ClipLoader size={35} color={'black'}/></div>) :
                    (<label className={successLabelStyles}>All changes saved<CheckIcon className='h-6 w-6 items-center'/></label>)
                }
            </div> 
            {goToLoading ? 
                    (<> 
                      <div className="flex flex-col py-3 bg-gray-50 hover:bg-white rounded border hover:cursor-pointer">
                        <h1 className='text-2xl px-4 py-2 hover:cursor-pointer'><ClipLoader size={40} color={'black'}/></h1>
                      </div>
                    </>) :
                    (<>
                        {roles.map((role) => {
                            return <RoleDetails key={String(role.id)} id={role.id} roleName={role.name} goToId={goToId}/>
                        })}
                    </>)
            }
                    
            {isCreatingRow ? 
                <div className={addRowStyles}>
                    <input className={inputStyles} value={name} placeholder='Role Name' onChange={(e)=>setName(e.target.value)}/>
                    <button className={successButtonStyles} onClick={()=>addRole()} disabled={isPosting}>Add</button>
                    <XMarkIcon className='w-6 h-6 hover:cursor-pointer' onClick={()=>setIsCreatingRow(false)}/>
                </div> 
                : <div className={newRowStyles}>
                    <button className={`${successButtonStyles} flex flex-row items-center`} disabled={isCreatingRow} onClick={()=>setIsCreatingRow(true)}><PlusIcon className='h-6 w-6'/>Add Role</button>
                </div>
            } 
        </>
        {crewedUp ? null :
        <div className="w-5/6 py-6 flex flex-row justify-between items-center">
          <button className={`${infoButtonStyles} w-1/2`} onClick={()=>handleCrewUp()}>{isCrewingUp ? <ClipLoader size={21} color={'white'}/> : 'Crew Up!'}</button>
          <div className='ml-24'>
                <p>When you click 'Crew Up!' offers will be sent to each of your top candidates, and this page will update to inform the status of their response. If anybody declines the offer, we will automatically send a new offer to the next person on the list.</p>
             </div>
        </div>}
    </div>
</main>


)
}

export default Assigned;