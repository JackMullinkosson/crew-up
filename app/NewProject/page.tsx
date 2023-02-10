import { Inter } from '@next/font/google'
import Link from 'next/link'
import NewProjectForm from '../Components/NewProjectForm'


export default function NewProject() {
  const infoButtonStyles = "my-4 inline-block flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"


  return (
   <main className='py-4 px-4'>
    <Link href="/" className={infoButtonStyles}>Back</Link>
    <NewProjectForm/>
   </main>
  )
}
