"use client"

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../Context/store';

export default function project ({ params }: any) { 
    const [id, setId] = useState(parseInt(params.id))
    const {projects, setProjects } = useGlobalContext();
    const [projectsLoading, setProjectsLoading] = useState(true)
    const thisProject = projects.find((i)=>i.id===id)

    useEffect(() => {
      if(projects.length<1)
      setProjectsLoading(true)
      console.log('recalled api')
      getProjects()
      }, []);
   

    async function getProjects(){
      try {
          const res = await fetch(`/api/getProjects`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          });
          setProjects(await res.json())
      } catch (error) {
          console.error(error);
      } finally {
          setProjectsLoading(false);
      }
  }


return(
    <main>
        <h1>hello</h1>
        <div>{projectsLoading ? <p>Loading...</p> : <p>{thisProject.name}</p>}</div>
    </main>
)

}