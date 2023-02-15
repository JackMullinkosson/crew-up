"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import NewUserForm from './NewUserForm';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useGlobalContext } from '../Context/store';

interface Props {
    role: String;
    roleId: Number;
    goToId: Number;
    tempId: number;
    people: {
        name: String;
        order: Number;
        id: Number;
        email: String;
        phoneNumber: String;
      }[] 
  }
  

const Personnel: React.FC<Props> = ({ role, people, goToId, roleId, tempId }) => {
    const { goTos, setGoTos } = useGlobalContext();
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [isViewingRole, setIsViewingRole] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [order, setOrder] = useState<Number>()
    const [editeeId, setEditeeId] = useState<Number>()
    const successButtonStyles = "mx-4 mt-4 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2"
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"

    function handleRoleClick (){
        if(isViewingRole)
        setIsViewingRole(false)
        else setIsViewingRole(true)
    }

    function handleEditUser(id){
        console.log('the id', id)
        const personIndex = people.findIndex(i => i.id === id)
        const currentEditee = people[personIndex]
        setEditeeId(Number(currentEditee.id))
        setName(String(currentEditee.name))
        setEmail(String(currentEditee.email))
        setPhoneNumber(String(currentEditee.phoneNumber))
        setOrder(Number(currentEditee.order))
    }

    async function createPerson (){
        setIsCreatingUser(false)
        setEditeeId(null)
        const newTempId = tempId+1
        console.log(newTempId)
        const newPerson = {
            name: name,
            email: email,
            order: people.length+1,
            id: newTempId,
            phoneNumber: phoneNumber,
            roleId: roleId
        }
        const goTosIndex = goTos.findIndex(i => i.id === goToId);
        const roleIndex = goTos[goTosIndex].roles.findIndex(i => i.name === role);
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
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    roleId: roleId,
                    order: people.length+1,
                }),
              });
              if (res.status !== 200) {
                console.log(await res.json())
              } 
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

    async function deletePerson(id){
        const goTosIndex = goTos.findIndex(i => i.id === goToId);
        const roleIndex = goTos[goTosIndex].roles.findIndex(i => i.name === role);
        const updatedGoTos = [...goTos]
        updatedGoTos[goTosIndex].roles[roleIndex].people = [...updatedGoTos[goTosIndex].roles[roleIndex].people.filter(i=> i.id !== id)];
        setGoTos(updatedGoTos);
        try{
            await fetch(`/api/deletePerson`,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id
                })
            })
        }
        catch(e){
            console.error(e)
        }
    }

    async function editPerson(id){
        console.log('the id', id)
        const editedPerson = {
            name: name,
            email: email,
            order: order,
            id: id,
            phoneNumber: phoneNumber,
            roleId: roleId
        }
        const goTosIndex = goTos.findIndex(i => i.id === goToId);
        const roleIndex = goTos[goTosIndex].roles.findIndex(i => i.name === role);
        const personIndex = people.findIndex(i => i.id === id)
        const updatedGoTos = [...goTos]
        updatedGoTos[goTosIndex].roles[roleIndex].people = [...updatedGoTos[goTosIndex].roles[roleIndex].people.slice(0, personIndex), editedPerson, ...updatedGoTos[goTosIndex].roles[roleIndex].people.slice(personIndex + 1)];
        setGoTos(updatedGoTos);
        setEditeeId(null)
        try{
            const res = await fetch(`/api/editPerson`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    roleId: roleId,
                    order: order
                })

            })
        }
        catch(e){
            console.error(e)
        }
        finally{
            setName('')
            setEmail('')
            setPhoneNumber('')
            setOrder(Number)  
        }
    }



return (
<main className="flex justify-center py-3 bg-gray-50 hover:bg-white rounded border">
    <div className="w-full px-8">   
        <h1 onClick={()=>handleRoleClick()} className='text-2xl py-4 hover:cursor-pointer'>{role}</h1> 
{isViewingRole ? 
    <div className="relative overflow-x-auto">    
    <div className="flex items-center justify-between bg-white dark:bg-gray-800">
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone Number</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr className='bg-white dark:bg-gray-800 dark:border-gray-700'><td><button className={successButtonStyles} onClick={()=>setIsCreatingUser(true)}><PlusIcon className='h-6 w-6'/>Add Go-To {role}</button></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
            {isCreatingUser ? <tr className="bg-white border-b border-t dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="pl-3">
                        <input className={inputStyles} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                    </div>  
                </th>
                <td className="px-6 py-4"><input className={inputStyles} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/></td>
                <td className="px-6 py-4"><input className={inputStyles} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone Number"/></td>
                <td className="px-6 py-4">
                    <button type="button" onClick={()=>createPerson()} className={infoButtonStyles}>Save</button>
                </td>
            </tr> : null}
            {people.map((person)=>{
                return <>{editeeId !== person.id ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <label>{String(person.order)}</label>
                    <div className="pl-3">
                        <div className="text-base font-semibold">{person.name}</div>
                    </div>  
                </th>
                <td className="px-6 py-4">{person.email}</td>
                <td className="px-6 py-4">{person.phoneNumber}</td>
                <td className="px-6 py-4 flex items-center">
                    <button onClick={()=>handleEditUser(person.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    <TrashIcon onClick={()=>deletePerson(person.id)} className='h-4 w-4 mx-3 hover:cursor-pointer text-red-500'/>
                </td>
            </tr>
            : <tr className="bg-white border-b border-t dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
            <label>{String(person.order)}</label>
                <div className="pl-3">
                    <input className={inputStyles} value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
                </div>  
            </th>
            <td className="px-6 py-4"><input className={inputStyles} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/></td>
            <td className="px-6 py-4"><input className={inputStyles} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone Number"/></td>
            <td className="px-6 py-4">
                <button type="button" onClick={()=>editPerson(person.id)} className={infoButtonStyles}>Save</button>
            </td>
        </tr> }</>})}
            </tbody>
            </table>
            </div>
        : null}
        </div>
</main>

)
};

export default Personnel;