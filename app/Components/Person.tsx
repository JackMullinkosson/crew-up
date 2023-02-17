import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { useGlobalContext } from '../Context/store';
import { TrashIcon } from '@heroicons/react/24/solid'

const rowStyles = "flex flex-row py-4 bg-gray-50 w-full justify-between border shrink-0"
const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
const tdStyles = 'mx-4 flex flex-col w-full justify-center items-center'
const infoButtonStyles = "py-1 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white px-2 rounded"
const inputStyles = "py-1 appearance-none w-fit bg-gray-200 text-gray-500 border border-black-500 rounded px-1 mb-1 leading-tight focus:outline-none focus:bg-white"


export interface PersonProps {
  id: number
  name: string
  order: number
  email: string
  phoneNumber: string
  roleId: number
  index: number
  movePerson: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Person: FC<PersonProps> = ({ id, name, index, email, phoneNumber, roleId, movePerson }) => {
  const { people, setPeople } = useGlobalContext();
  const [isHovering, setIsHovering] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [order, setOrder] = useState<number>()
  const [editeeId, setEditeeId] = useState<number>()
  const [isEditingUser, setIsEditingUser] = useState(false)
  
  let arrOfPersonnel = {}
  let currentIndex = 0
  people.forEach((person)=>{
      if (person.roleId === roleId){
      currentIndex++
      arrOfPersonnel[person.id] = currentIndex
      }
  })

  function handleEditUser(){
    setIsEditingUser(true)
    const personIndex = people.findIndex(i => i.id === id)
    const currentEditee = people[personIndex]
    setEditeeId(Number(currentEditee.id))
    setNewName(String(currentEditee.name))
    setNewEmail(String(currentEditee.email))
    setNewPhoneNumber(String(currentEditee.phoneNumber))
    setOrder(Number(currentEditee.order))
  }
  

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.PERSON,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      movePerson(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PERSON,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  
const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ opacity }} className={` ${rowStyles} relative`} data-handler-id={handlerId} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={`${tdStyles} ml-12`}>
        <label className={labelStyles}>Name</label>
          <div className='font-bold absolute left-2 bottom-4'>{arrOfPersonnel[id]}</div>
          {isEditingUser ? <input value={newName==='' ? name : newName} onChange={(e)=>setNewName(e.target.value)} className={inputStyles}></input> :
          <div>{name}</div>}
      </div>
      <div className={tdStyles}>
        <label className={labelStyles}>Email</label>
        {isEditingUser ? <input value={newEmail==='' ? email : newEmail} onChange={(e)=>setNewEmail(e.target.value)} className={inputStyles}></input> :
        <div>{email}</div>}
      </div>
      <div className={tdStyles}>
        <label className={labelStyles}>Phone #</label>
        {isEditingUser ? <input value={newPhoneNumber==='' ? phoneNumber : newPhoneNumber} onChange={(e)=>setNewPhoneNumber(e.target.value)} className={inputStyles}></input> :
        <div>{phoneNumber}</div>}
      </div>
      <div className={tdStyles}>
      {isEditingUser ? (<button className={infoButtonStyles}>Save</button>) : 
      (<div className={isHovering ? 'flex items-center justfy-content' : 'hidden'}>
      <button onClick={()=>handleEditUser()} className="font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:cursor-not-allowed">Edit</button>
      <TrashIcon onClick={()=>console.log('bye')} className='h-5 w-5 mx-6 hover:cursor-pointer text-red-500'/>
      </div>)}
      </div>
    </div>
  )
}
