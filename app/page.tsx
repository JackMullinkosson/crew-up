"use client"
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { PlusIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import { ProjectBoxes } from './Components/ProjectBoxes';
import { GoToBoxes } from './Components/GoToBoxes';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';


export default function Home() {
  const successButtonStyles = "bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 border-4 text-white py-1 px-1 rounded disabled:cursor-not-allowed items-center w-1/3"
  const infoButtonStyles = "bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 border-4 text-white py-1 px-1 rounded disabled:cursor-not-allowed items-center w-1/3"
  const rowStyles = "space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 mb-6 lg:mb-12"
  const newBoxStyles = "flex flex-row justify-center items-center center-text border-dashed border-black-500 border-4 py-8 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"
  const router = useRouter()
  const {user, isLoading, error} = useUser()

  if(isLoading) return (<ClipLoader className='h-6 w-6' />)
  else if(error) return (
    <main className='flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24'>
      <div className="w-3/4 py-6 flex flex-row items-center">
          <h1 className='text-red-500'>Error! Something went wrong.</h1>
      </div>
    </main> 
  )
  else if(user)
  return (
          <>
            <section className="bg-white dark:bg-gray-900 mt-10 lg:mt-14">
              <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                  <div className="max-w-screen-md mb-4 lg:mb-8">
                      <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Active Projects</h2>
                  </div>
                  <div className={rowStyles}>
                  <ProjectBoxes/>
                  <div className={newBoxStyles} onClick={()=>router.push('/NewProject')}>
                      <h3 className="text-xl font-bold dark:text-white mr-4">New Project</h3>
                      <PlusIcon className='h-6 w-6'/>
                  </div>
              </div>
              <div className="max-w-screen-md mb-4 lg:mb-8">
                      <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Go-To Lists</h2>
              </div>
                  <div className={rowStyles}>
                    <GoToBoxes/>
                    <div className={newBoxStyles} onClick={()=>router.push('/NewGoTo')}>
                      <h3 className="text-xl font-bold dark:text-white mr-4">New Go-To List</h3>
                      <PlusIcon className='h-6 w-6'/>
                    </div>
                  </div>
              </div>
            </section>
          </>
  )

else return (
  <div className='flex justify-center py-12 lg:py-16 bg-gray-100 h-screen'>
      <div className="w-1/3 h-fit mt-1/4 py-4 flex flex-col items-center bg-white rounded shadow shadow-xl">
          <WrenchScrewdriverIcon className='h-12 w-12'/>
          <h1 className='text-2xl font-bold py-4'> Welcome to Crew Up!</h1>
          <div className='flex flex-row justify-evenly w-full mt-4'>
              <button onClick={()=>router.push('/api/auth/login')} className={successButtonStyles}>Log in</button>
              <button onClick={()=>router.push('/api/auth/login')} className={infoButtonStyles}>Continue as guest</button>
          </div>
      </div>
    </div> 
)
}
