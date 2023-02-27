import Link from 'next/link';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'


export default function Navbar() {
  const menuItem = "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"

  return (
    <>
       <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <Link href='/'>
        <div className="flex items-center ml-2 md:mr-24 text-center hover:cursor-pointer">
          <WrenchScrewdriverIcon className='h-6 w-6'/>
          <h1 className="ml-4 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">CrewUp</h1>
        </div>
        </Link>
      </div>
    </div>
  </div>
</nav>
    </>
)
}