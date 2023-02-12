"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

const NewGoTo = () => {
    const router = useRouter()
    const inputStyles = "appearance-none w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    const borderStyles = "bg-gray-200 text-gray-700 border border-500 rounded focus:outline-none focus:bg-white"
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const successButtonStyles = "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
    const infoButtonStyles = "flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded"
    const defaultProdRoles = ['Producer', 'Co-Producer', 'Associate Producer', 'Production Coordinator', 'UPM', 'Key PA', 'PA']
    const defaultCineRoles = ['Gaffer', 'BBE', 'Electric', 'Key Grip', 'BBG', 'Grip', 'Camera Operator', 'First AC', 'Second AC', 'Camera Utility' ]
    const defaultArtRoles = ['Art Director', 'Production Designer', 'Set Decorator', 'Prop Master', 'Art PA']
    const [listName, setListName] = useState("")
    const [isChoosing, setIsChoosing] = useState(false)
    const [choice, setChoice] = useState("")

    async function submitList(){
        try{
          const res = await fetch(`/api/postGoTo`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: listName
          })
          })
          if (res.status !== 200) {
            console.log('error making new go to list')
          } else {
            console.log(await res.json());
          }
        }
        catch(e){
          console.error(e)
        }
      }

      function handleChoice(e){
        setIsChoosing(false)
        setChoice(e)
      }
    

      return(
        <>
        <form onSubmit={submitList} className="py-14 lg:py-20 px-4 mx-auto max-w-screen-md">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            {listName === "" ? "New Go-To List" : listName}
            </h1>
            <div className="w-full">
            <label className={labelStyles}>List Title</label>
            <input
            onChange={(e)=> setListName(e.target.value)}
            value={listName}
            type="text"
            className={inputStyles}
            />
            </div>
            <div className="w-full py-6">
            <label className={labelStyles}>Department</label>
                <div className="flex"><select className="flex appearance-none bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onClick={(e)=>handleChoice(e.target)} >
                    <option value="" disabled selected>Select option</option>
                    <option value="Production">Production</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Art">Art</option>
                 </select>
                 {choice==="" ? <ChevronDownIcon className="h-6 w-6 -ml-8 mt-2 postion-absolute"/> : null}
                 </div>
            </div>
            <div className='w-full py-6'>
            <button onClick={()=>submitList()} className={successButtonStyles}>Create Go-To List</button>
            </div>
        </form>
        </>
      )
}

export default NewGoTo;