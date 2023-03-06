"use client"

import { ClipLoader } from 'react-spinners';
import {VideoCameraIcon} from '@heroicons/react/24/solid'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context/store';

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
  const {dbUser, setDbUser} = useGlobalContext()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
  if(dbUser.id===0) return
   getProjects()
  },[dbUser])

  async function getProjects(){
    let res;
    try {
        res = await fetch(`api/getProjectsByUser/${dbUser.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
    }
    finally{
      const resProjects = await res.json()
      console.log(resProjects)
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