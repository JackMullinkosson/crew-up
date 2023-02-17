"use client"
import React, { useState, useEffect } from 'react';
import { Container } from './Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGlobalContext } from '../Context/store';
import { PlusIcon } from '@heroicons/react/24/solid';




const RoleDetails = ({id, name, goToId, tempId}) =>{
    const {goTos, setGoTos} = useGlobalContext()
    const {people, setPeople} = useGlobalContext()
    const [isViewingRole, setIsViewingRole] = useState(false)
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [noAdding, setNoAdding] = useState(false)
    const [noEditing, setNoEditing] = useState(false)
    const [newName, setNewName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [order, setOrder] = useState<number>()
    const boxStyles = "flex flex-col justify-center items-center mx-4 w-lg border rounded"
    const thStyles = "flex flex-row py-2 bg-gray-200 rounded w-full justify-between"
    const newRowStyles = "flex flex-row py-2 bg-gray-50 w-full justify-between border"
    const rowStyles = "flex flex-row py-4 bg-gray-50 w-full justify-between border"
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const tdStyles = 'mx-4 flex justify-center items-center flex-col'
    const successButtonStyles = "mx-4 mt-4 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2 disabled:cursor-not-allowed"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"

    useEffect(()=>{
        if (isCreatingUser){
        setNoEditing(true)
        return
        }
        if(isEditingUser){
        setNoAdding(true)
        return
        }
        setNoAdding(false)
        setNoEditing(false)
    },[isCreatingUser, isEditingUser])
    
    function handleRoleClick (){
        if(isViewingRole){
            setIsViewingRole(false)
        }
        else setIsViewingRole(true)
      }

      async function createPerson (){
        setIsCreatingUser(false)
        const newTempId = tempId+1
        const newPerson = {
            name: newName,
            email: email,
            order: people.length+1,
            id: newTempId,
            phoneNumber: phoneNumber,
            roleId: id
        }
        const goTosIndex = goTos.findIndex(i => i.id === goToId);
        const roleIndex = goTos[goTosIndex].roles.findIndex(i => i.name === name);
        const updatedGoTos = [...goTos];
        updatedGoTos[goTosIndex].roles[roleIndex].people = [  ...updatedGoTos[goTosIndex].roles[roleIndex].people, newPerson];
        setGoTos(updatedGoTos);
        let res;
        try{
             res = await fetch(`/api/createPerson`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newName,
                    email: email,
                    phoneNumber: phoneNumber,
                    roleId: id,
                    order: people.length+1,
                }),
              });
        }
        catch(e){
            console.error(e)
        }
        finally{
            const resPerson = await res.json();
            const resGoTos = [...goTos];
            const lastPersonIndex = resGoTos[goTosIndex].roles[roleIndex].people.length - 1;
            resGoTos[goTosIndex].roles[roleIndex].people[lastPersonIndex] = resPerson;
            setGoTos(resGoTos);
        }
    }
    
   

      

    return(
        <div className="flex flex-col py-3 bg-gray-50 hover:bg-white rounded border hover:cursor-pointer">
        <div onClick={() => handleRoleClick()} className="w-full">
        <h1 className='text-2xl px-4 py-2 hover:cursor-pointer'>{name}</h1>
        </div>
            <div className={`${boxStyles} ${isViewingRole ? '' : 'hidden'}`}>
                <div className={thStyles}>
                    <label className="px-6 py-3">Name</label>
                    <label className="px-6 py-3">Email</label>
                    <label className="px-6 py-3">Phone Number</label>
                    <label className="px-6 py-3">Action</label>
                </div>
                <div className={newRowStyles}>
                    <button className={successButtonStyles} onClick={()=>setIsCreatingUser(true)} disabled={noAdding}><PlusIcon className='h-6 w-6'/>Add Go-To {name}</button>
                </div>  
                <div className={`${rowStyles} ${isCreatingUser ? '' : 'hidden'}`}>
                        <div className={tdStyles}>
                            <input className={inputStyles} value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder="Name"/>
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
                <DndProvider backend={HTML5Backend}>
                    <Container roleId={id}/>
                </DndProvider>
                </div>
          </div>
    )
}

export default RoleDetails