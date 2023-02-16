"use client"
import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react'
import update from 'immutability-helper'
import { Person } from './Person'

export interface Person {
    name: string
    order: number
    id: number
    email: string
    phoneNumber: string
    roleId: number
  }
  
  export interface ContainerState {
    people: Person[]
  }

  export const Container: FC = () => {
    const [people, setPeople] = useState([
        {name: "Jack", order: 1, id: 92, email: "1", phoneNumber: "1",roleId:41},
        {name: "Gabi", order: 2, id: 93, email: "2", phoneNumber: "2",roleId: 41},
        {name: "Brinker", order: 3, id: 94, email: "3", phoneNumber: "3", roleId: 41}
    ])
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const tdStyles = 'mx-4 flex justify-center items-center flex-col'
    const boxStyles = "flex flex-col justify-center items-center py-20 mx-20 mt-20"

    const movePerson = useCallback((dragIndex: number, hoverIndex: number) => {
        setPeople((prevPeople: Person[]) =>
          update(prevPeople, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevPeople[dragIndex] as Person],
            ],
          }),
        )
      }, [])

      const renderPerson = useCallback(
        (person: { id: number; name: string, order: number, email: string, phoneNumber: string, roleId: number }, index: number) => {
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
            />
          )
        },
        [],
      )

    return(
        <>
        <div className={boxStyles}>{people.map((person, index)=> renderPerson(person, index))}</div>
        </>
    )
}
