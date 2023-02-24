"use client"
import React, { useState, useEffect } from 'react';
import { Container } from './Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGlobalContext } from '../Context/store';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';





const RoleDetails = ({id, roleName, goToId, peopleLoading}) =>{
    const {roles, setRoles, people, setPeople, setNoEditing} = useGlobalContext()
    const [isViewingRole, setIsViewingRole] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
    const [noAdding, setNoAdding] = useState<boolean>(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [tempId, setTempId] = useState<number>()
    const [peopleLength, setPeopleLength] = useState<number>()
    const boxStyles = "flex flex-col justify-center items-center mx-4 w-lg border rounded"
    const thStyles = "flex flex-row py-2 bg-gray-200 rounded w-full justify-between"
    const newRowStyles = "flex flex-row py-2 bg-gray-50 w-full justify-between border"
    const rowStyles = "flex flex-row py-4 bg-gray-50 w-full justify-between border"
    const tdStyles = 'mx-4 flex justify-center items-center flex-col'
    const successButtonStyles = "mx-4 mt-4 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2 disabled:cursor-not-allowed"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    const dangerButtonStyles = "flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"
    const lastCreatorTdStyles = 'mx-4 flex justify-center items-center flex-row'
    
    useEffect(()=>{
        getTempId()
        getPeopleLength()
       },[people])

    function getPeopleLength(){
        let length = 0
        for (const person of people) {
            if (person.roleId === id)
            length++
        }
        setPeopleLength(length)
    }

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

     function handleDeleteRoleClick(e){
        e.stopPropagation()
        if(peopleLength>0){
            setIsConfirmingDelete(true)
        }
        else deleteRole()
    }

    function handleCancelDelete(e){
        setIsConfirmingDelete(false)
        e.stopPropagation()
    }

    function handleDeleteConfirmed(e){
        setIsConfirmingDelete(false)
        deleteRole()
        e.stopPropagation()
    }
    
    async function deleteRole(){
        let updatedPeople = [...people]
        updatedPeople = updatedPeople.filter(i=>i.roleId !== id)
        let updatedRoles = [...roles]
        updatedRoles = updatedRoles.filter(i=> i.id !== id);
        setPeople(updatedPeople)
        setRoles(updatedRoles)
        let res;
        try{
             res = await fetch(`/api/deleteRole`,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    goToId: goToId
                })
            })
        }
        catch(e){
            console.error(e)
        }
        finally{
            const resRole = await res.json()
            let resPeople = [...people]
            let resRoles = [...roles]
            resRoles = resRoles.filter(i=> i.id !== resRole.id);
            resPeople = resPeople.filter(i=> i.roleId !== resRole.id)
            setPeople(resPeople)
            setRoles(resRoles)
        }
      }
   

      

    return(
        <div className="flex flex-col py-3 bg-gray-50 hover:bg-white rounded border">
        <div onClick={() => handleRoleClick()} onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=>setIsHovering(false) }className="w-full flex flex-row justify-between items-center relative">
        <h1 className='text-2xl px-4 py-2 hover:cursor-pointer w-full h-full'>{roleName}</h1>
        {isHovering ? <TrashIcon onClick={(e)=>handleDeleteRoleClick(e)} className='h-6 w-6 hover:cursor-pointer text-red-500 mr-6'/> : null}
        {isConfirmingDelete ? (
            <div className='absolute top-0 right-0 z-50 p-4 overflow-visible h-modal md:h-full w-1/4 mr-8'>
                 <div className="-mt-16 bg-white rounded-lg shadow-2xl p-6 text-center dark:bg-gray-700 flex flex-col">
                    <XMarkIcon className='h-6 w-6 self-end hover:cursor-pointer' onClick={(e)=>handleCancelDelete(e)}/>
                     <p className='py-4 inline-block self-start'>Are you sure? This will also delete {peopleLength>2 ? `all ${peopleLength}` : 'the'} included personnel.</p>
                     <button className={dangerButtonStyles} onClick={(e)=>handleDeleteConfirmed(e)}>Delete</button>
                </div>
            </div>
        ) : null}
        </div>
            <div className={`${boxStyles} ${isViewingRole ? '' : 'hidden'}`}>
                <div className={thStyles}>
                    <label className="px-6 py-3">Name</label>
                    <label className="px-6 py-3">Email</label>
                    <label className="px-6 py-3">Phone Number</label>
                    <label className="px-6 py-3">Action</label>
                </div>
                <div className={newRowStyles}>
                    <button className={`${successButtonStyles} disabled:cursor-not-allowed`} onClick={()=>handleCreateUserClick()} disabled={noAdding || isCreatingUser}><PlusIcon className='h-6 w-6'/>Add Go-To {roleName}</button>
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
                        <div className={lastCreatorTdStyles}>
                            <button className={infoButtonStyles} value={phoneNumber} onClick={()=>createPerson()}>Save</button>
                            <XMarkIcon className='h-6 w-6 ml-4 hover:cursor-pointer' onClick={()=>setIsCreatingUser(false)}/>
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

export default RoleDetails