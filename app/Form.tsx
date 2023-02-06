"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function FormProject(){
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const ownerId = 1;
    const router = useRouter()
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    const borderStyles = "bg-gray-200 text-gray-700 border border-500 rounded focus:outline-none focus:bg-white"
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    const [timeSelectors, setTimeSelectors] = useState<number[]>([]);

    useEffect(()=>{
        const days = calculateDays(startDate, endDate)
        let newTimeSelectors = []
        for (let i=1; i < days+1; i++){
            newTimeSelectors.push(i)
        }
       setTimeSelectors(newTimeSelectors)

    },[startDate, endDate])

    function calculateDays(firstDay: string, lastDay: string){
        const start = new Date(firstDay);
        const end = new Date(lastDay);
        const diffTime = Math.abs(end.valueOf() - start.valueOf());
        const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays
    }

    async function submitProject(e: React.FormEvent) {
        e.preventDefault();
        try {
          const res = await fetch(`/api/createProject`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              projectName,
              ownerId
            }),
          });
          if (res.status !== 200) {
            const error = await res.json();
            console.error(error.message);
          } else {
            console.log(await res.json());
            router.push("/")
          }
        } catch (error) {
          console.error(error);
        }
      }


    return(
        <form onSubmit={submitProject} className=" px-4 mx-auto max-w-screen-md">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            {projectName === "" ? "New Project" : projectName}
            </h1>
            <div className="w-full">
            <label className={labelStyles}>Project Title</label>
            <input
            onChange={(e)=> setProjectName(e.target.value)}
            value={projectName}
            type="text"
            className={inputStyles}
            />
            </div>
            <div className='w-full py-4'>
                <label className={labelStyles}>Log Line</label>
                <textarea onChange={(e)=> setDescription(e.target.value)}
                value={description} className={inputStyles}></textarea>
            </div>
            <div className="w-full flex">
                <div>
                    <label className={labelStyles}>Start Date</label>
                    <input type="date" onChange={(e)=> setStartDate(e.target.value)}
                    value={startDate} className={borderStyles}></input>
                </div>
                <div className="px-6">
                    <label className={labelStyles}>End Date</label>
                    <input type="date" onChange={(e)=> setEndDate(e.target.value)}
                    value={endDate} className={borderStyles}></input>
                </div>
            </div>
            <div style={{display: timeSelectors.length>0 ? 'block' : 'none'}}>
            {timeSelectors.map((i)=>{
               return <div className='w-full py-6 flex flex-row justify-between' key={i}><h4>Day {i}</h4>
               <div><label className={labelStyles}>Call Time:</label><select></select></div>
               <div><label className={labelStyles}>Wraps Times:</label><select></select></div>  
                </div>
            })}
            </div>
            <div className='w-full py-6'>
            <button type="submit" className={successButtonStyles}>Submit</button>
            </div>
        </form>
    )
}