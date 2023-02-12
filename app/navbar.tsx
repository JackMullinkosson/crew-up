"use client"
import { useRouter } from 'next/navigation';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'


export default function Navar() {
  const router = useRouter()
  const menuItem = "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"

  return (
    <>
       <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <div className="flex items-center ml-2 md:mr-24 text-center hover:cursor-pointer" onClick={()=>router.push('/')}>
          <WrenchScrewdriverIcon className='h-6 w-6'/>
          <h1 className="ml-4 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">CrewUp</h1>
        </div>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ml-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">Open user menu</span>
                <span className="w-8 h-8 rounded-full">J</span>
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white">
                  Neil Sims
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <button className={menuItem} onClick={()=>router.push(`/`)}>Profile</button>
                </li>
                <li>
                  <button className={menuItem} onClick={()=>router.push(`/GoTos`)}>Settings</button>
                </li>
                <li>
                  <button className={menuItem} onClick={()=>router.push(`/GoTos`)}>Log Out</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>
    </>
)
}