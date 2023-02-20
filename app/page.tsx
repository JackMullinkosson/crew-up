"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from './Context/store';
import { PlusIcon, VideoCameraIcon, LightBulbIcon, ClipboardIcon, PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

export default function Home() {
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [goTosLoading, setGoTosLoading] = useState(true)
  const [isPostingProject, setIsPostingProject] = useState(false)
  const [isPostingGoTo, setIsPostingGoTo] = useState(false)
  const boxStyles = "border-4 border-black-500 border-4 py-4 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"
  const boxIconStyles = "flex flex-row items-center mb-4 text-center"
  const rowStyles = "space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 mb-6 lg:mb-12"
  const newBoxStyles = "flex flex-row justify-center items-center center-text border-dashed border-black-500 border-4 py-8 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"
  const { projects, setProjects, goTos, setGoTos } = useGlobalContext();
  const router = useRouter()

  const icons = [<StarIcon className='h-6 w-6'/>, <ClipboardIcon className='h-6 w-6'/>, <LightBulbIcon className='h-6 w-6'/>, <PaintBrushIcon className='h-6 w-6'/>]

  function handleNewProjectClick(){
    setIsPostingProject(true)
    router.push('/NewProject')
  }

  function handleNewGoToClick(){
    setIsPostingGoTo(true)
    router.push('/NewGoTo')
  }

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

  useEffect(()=>{
    setProjectsLoading(true);
    setGoTosLoading(true)
    getGoTos()
    getProjects();
  },[])


  async function getGoTos(){
    try {
      const res = await fetch(`/api/getGoTos`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      });
      setGoTos(await res.json())
  } catch (error) {
      console.error(error);
  } finally {
      setGoTosLoading(false);
  }
}

 
  return (
    <main>
      <section className="bg-white dark:bg-gray-900 mt-10 lg:mt-14">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div className="max-w-screen-md mb-4 lg:mb-8">
          <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Active Projects</h2>
      </div>
      <div className={rowStyles}>
      {projectsLoading ? <div>Loading...</div> : projects.map((project)=>{
    return <div key={project.id} onClick={()=>router.push(`/project/${project.id}`)} className={boxStyles}>
              <div className={boxIconStyles}>
                <h3 className="text-xl font-bold dark:text-white mr-4">{project.name}</h3>
                <VideoCameraIcon className='h-6 w-6'/>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{moment(project.startDate).format("MMMM Do YYYY")} - {moment(project.endDate).format("MMMM Do YYYY")}</p>
          </div>})
      }
      <div className={newBoxStyles} onClick={()=>handleNewProjectClick()} >
      {isPostingProject ? <><ClipLoader size={40} color={'black'}/></> : <>
          <h3 className="text-xl font-bold dark:text-white mr-4">New Project</h3>
          <PlusIcon className='h-6 w-6'/></>}
      </div>
  </div>
  <div className="max-w-screen-md mb-4 lg:mb-8">
          <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Go-To Lists</h2>
      </div>
      <div className={rowStyles}>
      {goTosLoading ? <div>Loading...</div> : goTos.map((list)=>{
        return <div key={Number(list.id)} onClick={()=>router.push(`/GoTos/${list.id}`)} className={newBoxStyles}>
        <h3 className="text-xl font-bold dark:text-white mr-4">{list.name}</h3>
        {icons[String(list.icon)]}
  </div>
      })}
        <div className={newBoxStyles} onClick={()=>handleNewGoToClick()}>
        {isPostingGoTo ? <><ClipLoader size={40} color={'black'}/></> : <>
          <h3 className="text-xl font-bold dark:text-white mr-4">New Go-To List</h3>
          <PlusIcon className='h-6 w-6'/></>}
        </div>
      </div>
  </div>
</section>
    </main>
  )
}
