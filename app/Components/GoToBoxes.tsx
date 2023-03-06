"use client"
import { LightBulbIcon, ClipboardIcon, PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGlobalContext } from '../Context/store';
const newBoxStyles = "flex flex-row justify-center items-center center-text border-dashed border-black-500 border-4 py-8 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"



export const GoToBoxes = ({goTosLoading, goTos}) => {
    const icons = [<StarIcon className='h-6 w-6'/>, <ClipboardIcon className='h-6 w-6'/>, <LightBulbIcon className='h-6 w-6'/>, <PaintBrushIcon className='h-6 w-6'/>]
    const router = useRouter()

    return(
        <>
        {goTosLoading ? (<div className='py-12 px-24'><ClipLoader size={40} color={'black'}/></div>) :
        (<>{goTos.map((i)=>{
            if(i.defaultGoTo === true)
        return<div key={String(i.id)} className={newBoxStyles} onClick={()=>router.push(`/GoTos/${i.id}`)}>
        <h3 className="text-xl font-bold dark:text-white mr-4">{i.name}</h3>
        {icons[String(i.icon)]}
        </div>
        })}</>)}
        </>
    )
}