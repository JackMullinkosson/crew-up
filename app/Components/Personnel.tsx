"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import NewUserForm from './NewUserForm';
import { PlusIcon } from '@heroicons/react/24/solid'

interface Props {
    role: String;
    people: {
        name: String;
        order: Number;
        id: Number;
        email: String;
        phoneNumber: String;
      }[] 
  }
  

const Personnel: React.FC<Props> = ({ role, people }) => {
    const [roleName, setRoleName] = useState(role)
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isViewingRole, setIsViewingRole] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const successButtonStyles = "mx-4 flex items-center flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2"
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-500 border border-black-500 rounded py-2 px-1 mb-1 leading-tight focus:outline-none focus:bg-white"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    
    console.log(people)
    function handleRoleClick (){
        if(isViewingRole)
        setIsViewingRole(false)
        else setIsViewingRole(true)
    }

    async function createPerson (){
        try{
            const res = await fetch(`/api/createPerson`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    roleName: roleName
                }),
              });
              if (res.status !== 200) {
                console.log(await res.json())
              } else {
                console.log(await res.json());
              }
        }
        catch(e){
            console.error(e)
        }
    }



return (
<main className="flex justify-center py-3 bg-gray-50 hover:bg-white rounded border">
    <div className="w-full px-8">   
        <h1 onClick={()=>handleRoleClick()} className='text-2xl py-2 hover:cursor-pointer'>{role}</h1> 
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
            <tr className='w-full bg-white dark:bg-gray-800 dark:border-gray-700'><button className={successButtonStyles} onClick={()=>setIsCreatingUser(true)}><PlusIcon className='h-6 w-6'/>Add Go-To {role}</button></tr>
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
                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <label>{String(person.order)}</label>
                    <div className="pl-3">
                        <div className="text-base font-semibold">{person.name}</div>
                    </div>  
                </th>
                <td className="px-6 py-4">{person.email}</td>
                <td className="px-6 py-4">{person.phoneNumber}</td>
                <td className="px-6 py-4">
                    <a type="button" onClick={()=>setIsEditingUser(true)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td>
            </tr>
            })}
            </tbody>
            </table>
            </div>
        : null}
        </div>
</main>

)
};

export default Personnel;