"use client"

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';

interface Project {
    name: string;
    id: number;
    owner: {
      id: number;
    };
    startDate: Date;
    endDate: Date;
    logLine: string;
    dayDetails: {
      startTime: Date;
      endTime: Date;
      location: string;
    }[];
  }

export default function project ({ params }: any) { 
    const [id, setId] = useState(parseInt(params.id))
    const {projects, setProjects } = useGlobalContext();
    const [projectLoading, setProjectLoading] = useState(true)
    const [thisProject, setThisProject] = useState<Project | null>(null);
      
      

    useEffect(()=>{
        async function setCurrent(){
            try{
                const current = projects.find(proj => proj.id===id)
                if(current)
                setThisProject(current)
            }
            finally{
                setProjectLoading(false)
            }
        }
       setCurrent()
    },[])

    useEffect(() => {
        if (projects.length===0)
        setProjectLoading(true)
         getOneProject()
      }, [projects]);

    async function getOneProject() {
        try {
          const res = await fetch(`/api/getOneProject/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          setThisProject(await res.json());
        } catch (error) {
          console.error(error);
        } finally {
          setProjectLoading(false);
        }
      }

    
      console.log(thisProject)
  

return(
    <main>
        <h1>hello</h1>
        <div>{projectLoading ? <p>Loading...</p> : <p>{thisProject?.name}</p>}</div>
    </main>
)

}