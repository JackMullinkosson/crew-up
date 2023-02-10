"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import NewUserForm from './NewUserForm';

interface Props {
    role: string;
  }
  

const Personnel: React.FC<Props> = ({ role }) => {
    const [isCreatingUser, setIsCreatingUser] = useState(false)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isViewingRole, setIsViewingRole] = useState(false)
    const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded my-2"

    function handleRoleClick (){
        if(isViewingRole)
        setIsViewingRole(false)
        else setIsViewingRole(true)
    }

return (
<main className="flex justify-center py-3 bg-gray-50 hover:bg-white rounded border">
    <div className="w-full px-8">   
        <h1 onClick={()=>handleRoleClick()} className='text-2xl py-2'>{role}</h1> 
{isViewingRole ? 
    <div className="relative overflow-x-auto">
    <button className={successButtonStyles} onClick={()=>setIsCreatingUser(true)}>Add Go-To {role}</button>    
    <div className="flex items-center justify-between bg-white dark:bg-gray-800">
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
                    <div className="pl-3">
                        <div className="text-base font-semibold">Neil Sims</div>
                    </div>  
                </th>
                <td className="px-6 py-4">neilsims@crewup.com</td>
                <td className="px-6 py-4">847-903-4099</td>
                <td className="px-6 py-4">
                    <a type="button" onClick={()=>setIsEditingUser(true)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td>
            </tr>
            </tbody>
            </table>
            </div>
        : null}
        </div>
        {isCreatingUser ? <NewUserForm role={role} setIsCreatingUser={setIsCreatingUser}/>
        : null}
            
        
</main>

)
};

export default Personnel;