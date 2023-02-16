"use client"
import React, { useState, useEffect } from 'react';


const RoleDetails = ({id, name}) =>{

    const [isViewingRole, setIsViewingRole] = useState(false)
    const boxStyles = "flex flex-col justify-center items-center py-4 mx-4 w-lg"
    const thStyles = "flex flex-row py-2 my-2 bg-gray-200 rounded w-full justify-between"
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const tdStyles = 'mx-4 flex justify-center items-center flex-col'
    const rowStyles = "flex flex-row py-2 my-2 bg-gray-200 rounded w-full justify-between"

    function handleRoleClick (){
        if(isViewingRole){
            setIsViewingRole(false)
        }
        else setIsViewingRole(true)
      }
      

    return(
        <div onClick={() => handleRoleClick()} className="flex flex-col py-3 bg-gray-50 hover:bg-white rounded border hover:cursor-pointer">
        <h1 className='text-2xl px-4 py-2 hover:cursor-pointer'>{name}</h1>
            <div className={`${boxStyles} ${isViewingRole ? '' : 'hidden'}`}>
                <div className={thStyles}>
                    <label className="px-6 py-3">Name</label>
                    <label className="px-6 py-3">Email</label>
                    <label className="px-6 py-3">Phone Number</label>
                    <label className="px-6 py-3">Action</label>
                </div>
          </div>
      </div>
    )
}

export default RoleDetails