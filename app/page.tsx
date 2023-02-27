import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid'
import { ProjectBoxes } from './Components/ProjectBoxes';
import { GoToBoxes } from './Components/GoToBoxes';
import Link from 'next/link';


export default async function Home() {
  const rowStyles = "space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 mb-6 lg:mb-12"
  const newBoxStyles = "flex flex-row justify-center items-center center-text border-dashed border-black-500 border-4 py-8 pl-4 rounded hover:cursor-pointer hover:bg-gray-100"

 
  return (
    <main>
      <section className="bg-white dark:bg-gray-900 mt-10 lg:mt-14">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div className="max-w-screen-md mb-4 lg:mb-8">
          <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Active Projects</h2>
      </div>
      <div className={rowStyles}>
      <ProjectBoxes/>
      <Link href='/NewProject'>
      <div className={newBoxStyles}>
          <h3 className="text-xl font-bold dark:text-white mr-4">New Project</h3>
          <PlusIcon className='h-6 w-6'/>
      </div>
      </Link>
  </div>
  <div className="max-w-screen-md mb-4 lg:mb-8">
          <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Go-To Lists</h2>
      </div>
      <div className={rowStyles}>
        <GoToBoxes/>
        <Link href='/NewGoTo'>
        <div className={newBoxStyles}>
          <h3 className="text-xl font-bold dark:text-white mr-4">New Go-To List</h3>
          <PlusIcon className='h-6 w-6'/>
        </div>
        </Link>
      </div>
  </div>
</section>
    </main>
  )
}
