"use client"
import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react'
import update from 'immutability-helper'
import { Person } from './Person'
import { useGlobalContext } from '../Context/store';

export interface Person {
    name: string
    order: number
    id: number
    email: string
    phoneNumber: string
    roleId: number
    index: number
    goToId: number
  }
  
  export interface ContainerState {
    people: Person[]
  }

  interface Props {
    roleId: number
    setNoAdding: (boolean) => void
    goToId: number
  }

  export const Container: React.FC<Props> = ({roleId, goToId, setNoAdding}) => {
    const { people, setPeople, setIsPosting } = useGlobalContext();
    const [dragged, setDragged] = useState<number>(-1)

    useEffect(()=>{
      setDragged(-1)
    },[])

    useEffect(()=>{
    async function updateOrder(){
      setIsPosting(true)
      let res;
      try{
           res = await fetch(`/api/reorderPeople`,{
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                 people: people
              })
  
          })
      }
      catch(e){
          console.error(e)
      }
      finally{
        setIsPosting(false)
      }
  }
  if(dragged===-1) return
  updateOrder()
},[people])
    
    
    const movePerson = useCallback((dragIndex: number, hoverIndex: number) => {
        setPeople((prevPeople: Person[]) =>
          update(prevPeople, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevPeople[dragIndex] as Person],
            ],
          }),
        )
        setDragged(dragIndex)
      }, [])

      const renderPerson = useCallback(
        (person: { id: number; name: string, order: number, email: string, phoneNumber: string, roleId: number, goToId: number}, index: number) => {
          if(person.roleId===roleId){
          return (
            <Person
              key={person.id}
              order={person.order}
              email={person.email}
              phoneNumber={person.phoneNumber}
              roleId={person.roleId}
              index={index}
              id={person.id}
              name={person.name}
              movePerson={movePerson}
              setNoAdding={setNoAdding}
              goToId={goToId}
            />
          )
          }
        },
        [],
      )

    return(
        <>
        {people?.map((person, index)=> renderPerson(person, index))}
        </>
    )
}
