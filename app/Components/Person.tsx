import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'

const rowStyles = "flex flex-row py-4 bg-gray-50 w-full justify-between border"
const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
const tdStyles = 'mx-4 flex justify-center items-center flex-col'

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

export const Person: FC<PersonProps> = ({ id, name, index, email, phoneNumber, movePerson }) => {
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
    <div ref={ref} style={{ opacity }} className={rowStyles} data-handler-id={handlerId}>
      <div className={tdStyles}>
        <label className={labelStyles}>Order</label>
        <div>{index+1}</div>
      </div>  
      <div className={tdStyles}>
        <label className={labelStyles}>Name</label>
        <div>{name}</div>
      </div>
      <div className={tdStyles}>
        <label className={labelStyles}>Email</label>
        <div>{email}</div>
      </div>
      <div className={tdStyles}>
        <label className={labelStyles}>Phone #</label>
        <div>{phoneNumber}</div>
      </div>
    </div>
  )
}
