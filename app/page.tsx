"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './Context/store';

export default function Home() {
  const [projectsLoading, setProjectsLoading] = useState(true);
  const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
  const projButtonStyles = "block w-1/2 my-4 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-2 px-2 rounded"
  const { projects, setProjects } = useGlobalContext();
  const router = useRouter()

  console.log('this', projects)
  async function getProjects(){
    try {
        const res = await fetch(`/api/getProjects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
        // setProjectList(await res.json());
        setProjects(await res.json())
    } catch (error) {
        console.error(error);
    } finally {
        setProjectsLoading(false);
    }
}

useEffect(()=>{
  setProjectsLoading(true);
  getProjects();
},[])

  
 
  return (
    <main>
      <h1 className="py-4">Home</h1>
      <h2 className="py-2">Active Projects:</h2>
      <div className='flex py-4 px-4 flex-col'>
      {projectsLoading ? <div>Loading...</div> : projects.map((project)=>{
       return <button className={projButtonStyles} key={project.id} onClick={()=>router.push(`/project/${project.id}`)}>{project.name}</button>
})}
      <button className={successButtonStyles} onClick={()=>router.push('/NewProject')}>Create New Project</button>
      </div>
    </main>
  )
}
