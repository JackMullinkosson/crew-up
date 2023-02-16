import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const rowStyles = "flex flex-row py-2 my-2 bg-gray-200 rounded w-full justify-between"


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

export const Person: FC<PersonProps> = ({ id, name, index, movePerson }) => {
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

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      movePerson(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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


  //person styles:

//   <div  key={person.id} className={rowStyles}>
//   <div className={tdStyles}>
//       <label className={labelStyles}>Order</label>
//       <div>{person.order}</div>
//   </div>
//   <div className={tdStyles}>
//       <label className={labelStyles}>Name</label>
//       <div>{person.name}</div>
//   </div>
//   <div className={tdStyles}>
//       <label className={labelStyles}>Email</label>
//       <div>{person.email}</div>
//   </div>
//   <div className={tdStyles}>
//       <label className={labelStyles}>Phone #</label>
//       <div>{person.phoneNumber}</div>
//   </div>
// </div>

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ opacity }} className={rowStyles} data-handler-id={handlerId}>
      {name}
    </div>
  )
}
