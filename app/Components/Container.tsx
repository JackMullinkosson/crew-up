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
  }
  
  export interface ContainerState {
    people: Person[]
  }

  interface Props {
    roleId: number
  }

  export const Container: React.FC<Props> = ({roleId}) => {
    const { people, setPeople } = useGlobalContext();

 

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
          if(person.roleId===roleId)
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
        {people.map((person, index)=> renderPerson(person, index))}
        </>
    )
}