"use client"
import { useState, useEffect } from "react"
import { ClipLoader } from 'react-spinners';
const dangerButtonStyles = "w-1/4 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-lg border-4 text-white py-1 px-2 rounded"
const successButtonStyles = "w-1/4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded"



const ResponseButtons = ({personId}) =>{
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeclining, setIsDeclining] = useState(false)
    const [status, setStatus] = useState("")
    const [statusIcon, setStatusIcon] = useState<number>()

    useEffect(() => {
        if (status && statusIcon) {
          addStatus();
        }
      }, [status, statusIcon]);


    function handleClick(e){
        console.log(e.target.innerHTML)
        if(e.target.innerHTML==="Confirm"){
            setIsConfirming(true)
            setStatus("Confirmed")
            setStatusIcon(2)

        }
        if(e.target.innerHTML==="Decline"){
            setIsDeclining(true)
            setStatus("Declined")
            setStatusIcon(1)
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
                    status: status,
                    statusIcon: statusIcon
                })
            })

        }
        finally{
            const resPerson = await res.json()
            console.log(resPerson)
            setIsConfirming(false)
            setIsDeclining(false)
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