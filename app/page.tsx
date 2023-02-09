"use client";

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './Context/store';

export default function Home() {
  const [projectsLoading, setProjectsLoading] = useState(true);
  const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
  const { projects, setProjects } = useGlobalContext();

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
      {projectsLoading ? <div>Loading...</div> : projects.map((project)=>{
       return <h3 key={project.id} className="py-2">{project.name}</h3>
})}
      <button className={successButtonStyles}>Create New Project</button>
    </main>
  )
}
