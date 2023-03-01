"use client"
import { LightBulbIcon, ClipboardIcon, PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
const newBoxStyles = "flex flex-row justify-center items-center center-text border-dashed border-black-500 border-4 py-8 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"

interface goTo {
    name: String;
    id: Number;
    icon: Number;
  }

export const GoToBoxes = () => {
    const icons = [<StarIcon className='h-6 w-6'/>, <ClipboardIcon className='h-6 w-6'/>, <LightBulbIcon className='h-6 w-6'/>, <PaintBrushIcon className='h-6 w-6'/>]
    const [goTos, setGoTos] = useState<goTo[]>([]);
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    console.log(goTos)

    useEffect(()=>{
        getGoTos()
    },[])

    async function getGoTos(){
        let res;
        try {
         res = await fetch(`api/getGoTos`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
          });
      } catch (error) {
          console.error(error);
      } 
      finally{
        const resGoTos = await res.json()
        setGoTos(resGoTos)
        setLoading(false)
      }
      }

    return(
        <>
        {loading ? (<div className='py-12 px-24'><ClipLoader size={40} color={'black'}/></div>) :
        (<>{goTos && goTos.map((i)=>{
        return<div className={newBoxStyles} onClick={()=>router.push(`/GoTos/${i.id}`)}>
        <h3 className="text-xl font-bold dark:text-white mr-4">{i.name}</h3>
        {icons[String(i.icon)]}
        </div>
        })}</>)}
        </>
    )
}