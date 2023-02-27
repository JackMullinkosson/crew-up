"use client"

import { ClipLoader } from 'react-spinners';
import {VideoCameraIcon} from '@heroicons/react/24/solid'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const boxStyles = "border-4 border-black-500 border-4 py-4 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"
const boxIconStyles = "flex flex-row items-center mb-4 text-center"

interface project {
  name: String;
  id: Number;
  startDate: Date;
  endDate: Date;
}


export const ProjectBoxes = () => {
  const [projects, setProjects] = useState<project[]>([]);
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
   getProjects()
  },[])

  async function getProjects(){
    let res;
    try {
        res = await fetch(`api/getProjects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (error) {
        console.error(error);
    }
    finally{
      const resProjects = await res.json()
      setProjects(resProjects)
      setLoading(false)
    } 
  }

    return(
      <>
        {loading ? (<div className='py-12 px-24'><ClipLoader size={40} color={'black'}/></div>) :
        (<>{projects.map((i)=>{
        return <div className={boxStyles} key={String(i.id)} onClick={()=>router.push(`/project/${i.id}`)}>
              <div className={boxIconStyles}>
                <h3 className="text-xl font-bold dark:text-white mr-4">{i.name}</h3>
                <VideoCameraIcon className='h-6 w-6'/>
              </div>
              <p className="text-gray-500 dark:text-gray-400">{moment(i.startDate).format("MMMM Do YYYY")} - {moment(i.endDate).format("MMMM Do YYYY")}</p>
          </div>
            })}</>)}
      </>

    )
}