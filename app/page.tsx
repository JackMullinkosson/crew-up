import Link from "next/link"

async function getProjects(){
  const res = await fetch(`${process.env.BASE_URL}/api/getProjects`)
  if(!res.ok){
    console.log(res)
  }
  return res.json()
}


export default async function Home() {
  const data: {name: string, id: number}[] = await getProjects()
  return (
    <main>
      <h1 className="py-4">Home</h1>
      <h2 className="py-2">Active Projects:</h2>
      {data.map((project)=>(
        <h3 className="py-2">{project.name}</h3>
      ))}
      <Link href="/NewProject">Create New Project</Link>
    </main>
  )
}
