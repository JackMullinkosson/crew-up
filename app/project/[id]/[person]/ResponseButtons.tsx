"use client"
import { useState, useEffect } from "react"
import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from "@/app/Context/store";
const dangerButtonStyles = "w-1/4 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-lg border-4 text-white py-1 px-2 rounded"
const successButtonStyles = "w-1/4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded"



const ResponseButtons = ({personId, project, ownerId}) =>{
    const {people, setPeople} = useGlobalContext()
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeclining, setIsDeclining] = useState(false)
    const [status, setStatus] = useState("")
    const [statusIcon, setStatusIcon] = useState<number>()
    const [roleId, setRoleId] = useState<number>()

    useEffect(()=>{
        getPeople()
    }, [])

    useEffect(()=>{
        if(people.length<1) return
        const personIndex = people.findIndex((i)=>i.id===personId)
        const roleId = people[personIndex].roleId
        setRoleId(roleId)
    },[people])

    useEffect(() => {
        if (status && statusIcon && roleId && people) {
          addStatus();
        }
      }, [status, statusIcon]);


    function handleClick(e){
        if(e.target.innerHTML==="Confirm"){
            setIsConfirming(true)
            setStatus("Confirmed")
            setStatusIcon(4)

        }
        if(e.target.innerHTML==="Decline"){
            setIsDeclining(true)
            setStatus("Declined")
            setStatusIcon(3)
        }
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
            setIsConfirming(false)
            setIsDeclining(false)
        }
    }

    async function getPeople(){
        let res;
        try {
           res = await fetch(`/api/getPeople`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          });
          setPeople(await res.json())
      } catch (error) {
          console.error(error);
      }
    }

    return(
        <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
                <button className={successButtonStyles} onClick={(e)=>handleClick(e)}>{isConfirming ? <ClipLoader size={21} color={'white'}/> : 'Confirm'}</button>
                <button className={dangerButtonStyles} onClick={(e)=>handleClick(e)}>{isDeclining ? <ClipLoader size={21} color={'white'}/> : 'Decline'}</button>
        </div>
    )
}

export default ResponseButtons;