import moment from 'moment';
const BASE_URL = "http://localhost:3000/"
import ResponseButtons from './ResponseButtons';

export default async function Page ({ params }: any) {
    const personId = parseInt(params.person)
    const projectId = parseInt(params.id)


    async function getProjectById() {
        const res = await fetch(`${BASE_URL}api/getProjectById/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          return await res.json(); 
        } else {
          return null; 
        }
      }

    const project = await getProjectById()
    const ownerId = project.ownerId

    return(
      <main className='flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24'>
            <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
                <h1 className='text-6xl font-bold'>{project.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 ml-6 w-1/2">{moment(project.startDate).format("MMMM Do YYYY")} - {moment(project.endDate).format("MMMM Do YYYY")}</p>
            </div>
            <ResponseButtons personId={params.person} project={project} ownerId={ownerId} />
        </main>

    )
}