"use client"
import React, { useState, useEffect } from 'react';
import { Container } from './Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGlobalContext } from '../Context/store';
import { PlusIcon } from '@heroicons/react/24/solid';




const ProjectRoleDetails = ({id, roleName, goToId, peopleLoading}) =>{
    const {people, setPeople, setNoEditing} = useGlobalContext()
    const [isViewingRole, setIsViewingRole] = useState(false)
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [noAdding, setNoAdding] = useState<boolean>(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [tempId, setTempId] = useState<number>()
    const boxStyles = "flex flex-col justify-center items-center mx-4 w-lg border rounded"
    const thStyles = "flex flex-row py-2 bg-gray-200 rounded w-full justify-between"
    const newRowStyles = "flex flex-row py-2 bg-gray-50 w-full justify-between border"
    const rowStyles = "flex flex-row py-4 bg-gray-50 w-full justify-between border"
    const tdStyles = 'mx-4 flex justify-center items-center flex-col'
    const successButtonStyles = "mx-4 mt-4 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2 disabled:cursor-not-allowed"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"

    useEffect(()=>{
        getTempId()
       },[people])

    function getTempId(){
        const arrOfIds = []
        for (const person of people) {
              arrOfIds.push(person.id);
            }
          arrOfIds.sort((a, b)=>b-a)
          if(arrOfIds.length<1){
          arrOfIds.push(0)
        }
        setTempId(arrOfIds[0])
      }
      
    function handleCreateUserClick(){
        setNoEditing(true)
        setIsCreatingUser(true)
    }

    
    function handleRoleClick (){
        if(isViewingRole){
            setIsViewingRole(false)
        }
        else setIsViewingRole(true)
      }

    

      async function createPerson (){
        setNoEditing(false)
        setIsCreatingUser(false)
        const newTempId = tempId+1
        const newPerson = {
            name: name,
            email: email,
            order: people.length+1,
            id: newTempId,
            phoneNumber: phoneNumber,
            roleId: id
        }
        let updatedPeople = [...people];
        updatedPeople = [  ...people, newPerson];
        setPeople(updatedPeople);
        let res;
        try{
             res = await fetch(`/api/createPerson`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({newPerson}),
              });
        }
        catch(e){
            console.error(e)
        }
        finally{
            setName('')
            setPhoneNumber('')
            setEmail('')
            const resPerson = await res.json();
            let resPeople = [...people];
            resPeople = [...people, resPerson]
            setPeople(resPeople);
        }
    }
    
   

      

    return(
        <div className="flex flex-col py-3 bg-gray-50 hover:bg-white rounded border hover:cursor-pointer">
        <div onClick={() => handleRoleClick()} className="w-full">
        <h1 className='text-2xl px-4 py-2 hover:cursor-pointer'>{roleName}</h1>
        </div>
            <div className={`${boxStyles} ${isViewingRole ? '' : 'hidden'}`}>
                <div className={thStyles}>
                    <label className="px-6 py-3">Name</label>
                    <label className="px-6 py-3">Email</label>
                    <label className="px-6 py-3">Phone Number</label>
                    <label className="px-6 py-3">Action</label>
                </div>
                <div className={newRowStyles}>
                    <button className={`${successButtonStyles} disabled:cursor-not-allowed`} onClick={()=>handleCreateUserClick()} disabled={noAdding}><PlusIcon className='h-6 w-6'/>Add Go-To {roleName}</button>
                </div>  
                <div className={`${rowStyles} ${isCreatingUser ? '' : 'hidden'}`}>
                        <div className={tdStyles}>
                            <input className={inputStyles} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                        </div>
                        <div className={tdStyles}>
                            <input className={inputStyles} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                        </div>
                        <div className={tdStyles}>
                            <input className={inputStyles} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone #"/>
                        </div>
                        <div className={tdStyles}>
                            <button className={infoButtonStyles} value={phoneNumber} onClick={()=>createPerson()}>Save</button>
                        </div>      
                </div>
                {peopleLoading ? <div>Loading..</div>:
                <DndProvider backend={HTML5Backend}>
                    <Container roleId={id} setNoAdding={setNoAdding}/>
                </DndProvider>}
                </div>
          </div>
    )
}

export default ProjectRoleDetails