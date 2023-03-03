"use client"
import { useState, useEffect } from "react"
import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from "@/app/Context/store";
const dangerButtonStyles = "w-1/4 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-lg border-4 text-white py-1 px-2 rounded"


const Confirmed = ({ownerId, project, roleId, personId}) => {
    const {people} = useGlobalContext()
    const status = "Declined";
    const statusIcon = 3; 
    const [isDeclining, setIsDeclining] = useState(false) 
    
    function handleClick(){
                setIsDeclining(true)
                addStatus()
            }
        
    async function addStatus(){
            let res;
            try{
                res = await fetch(`/api/editStatus`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: personId,
                        people: people,
                        roleId: roleId,
                        project: project,
                        ownerId: ownerId,
                        status: status,
                        statusIcon: statusIcon
                    })
                })

            }
            finally{
                const resPerson = await res.json()
                setIsDeclining(false)
                window.location.reload()
            }
        }

    return (
        <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
        <p>Thanks! You have been confirmed for this project.</p>
        <button className={dangerButtonStyles} onClick={()=>handleClick()}>{isDeclining ? <ClipLoader size={21} color={'white'}/> : 'Cancel'}</button>
        </div>
    )
}

export default Confirmed;