"use client"
import { ChevronDownIcon, PlusIcon, XMarkIcon, CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';
import { ClipLoader } from 'react-spinners';
import ProjectRoleDetails from '../ProjectRoleDetails';
import moment from 'moment';
import goTo from '@/app/GoTos/[id]/page';

const newRowStyles = "flex flex-row items-center py-4 mt-2 w-full justify-between"
const addRowStyles = "flex flex-row w-1/4 items-center mt-2 justify-between bg-white border px-4 py-4 mb-4"
const inputStyles = "appearance-none w-1/2 bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"
const successLabelStyles = "h-6 uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 flex flex-row items-center text-teal-500"
const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:cursor-not-allowed"



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


const Assigned = ({id}) => {
    const [isPosting, setIsPosting] = useState(false)
    const [projectLoading, setProjectLoading] = useState(true)
    const [goToLoading, setGoToLoading] = useState(true)
    const [isCreatingRow, setIsCreatingRow] = useState(false)
    const [name, setName] = useState('')
    const {people, setPeople, roles, setRoles } = useGlobalContext();
    const [project, setProject] = useState<Project>({ name: "", id: 0, startDate: new Date(), endDate: new Date() });
    const [goToId, setGoToId] = useState()

    useEffect(()=>{
        getProjectById()
        getGoToById()
    },[])

    async function getProjectById(){
        try {
            const res = await fetch(`/api/getProjectById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });
            setProject(await res.json())
        } catch (error) {
            console.error(error);
        }
        finally{
            setProjectLoading(false)
        }
    }

    async function getGoToById() {
        let res;
        try{
         res = await fetch(`/api/getGoToById/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
            }
        catch(e){
            console.error(e)
        }
        finally{
            const goTo = await res.json()
            console.log('this', goTo)
            setGoToId(goTo.id)
            setPeople(goTo.people)
            setRoles(goTo.roles)
            setGoToLoading(false)
        }
       
      }

    async function addRole(){
        console.log('hi')
    }



return (

    <main className='flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24'>
    {projectLoading ? <ClipLoader size={35} color={'red'}/> :    
    <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
        <h1 className='text-6xl font-bold'>{project.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 ml-6 w-1/2">{moment(project.startDate).format("MMMM Do YYYY")} - {moment(project.endDate).format("MMMM Do YYYY")}</p>
    </div>}
    <div className='w-5/6 pt-3 pb-1'>
        <>
            <div className={newRowStyles}>
                {isPosting ?
                    (<div className='flex ml-4 items-center'><ClipLoader size={35} color={'red'}/></div>) :
                    (<label className={successLabelStyles}>No unsaved changes <CheckIcon className='h-6 w-6 items-center'/></label>)
                }
            </div> 
            {goToLoading ? null :
                <>
                    {roles.map((role) => {
                        return <ProjectRoleDetails key={String(role.id)} id={role.id} roleName={role.name} goToId={goToId}/>
                    })}
                </>
            }
                    
            {isCreatingRow ? 
                <div className={addRowStyles}>
                    <input className={inputStyles} value={name} placeholder='Role Name' onChange={(e)=>setName(e.target.value)}/>
                    <button className={successButtonStyles} onClick={()=>addRole()}>Add</button>
                    <XMarkIcon className='w-6 h-6 hover:cursor-pointer' onClick={()=>setIsCreatingRow(false)}/>
                </div> 
                : <div className={newRowStyles}>
                    <button className={`${successButtonStyles} disabled:cursor-not-allowed`} disabled={isCreatingRow} onClick={()=>setIsCreatingRow(true)}><PlusIcon className='h-6 w-6'/>Add Role</button>
                </div>
            } 
        </>
    </div>
</main>


)
}

export default Assigned