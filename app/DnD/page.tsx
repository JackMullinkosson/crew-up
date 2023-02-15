"use client"
import React, { useState, useEffect } from 'react';


const DnD = () => {

    const data = [{"name":"Jack","order":1,"id":92,"email":"1","phoneNumber":"1","roleId":41},{"name":"Gabi","order":2,"id":93,"email":"2","phoneNumber":"2","roleId":41},{"name":"Brinker","order":3,"id":94,"email":"3","phoneNumber":"3","roleId":41}]
    const labelStyles = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    const tdStyles = 'mx-4 flex justify-center items-center flex-col'

    return(
        <div>
        <div className="flex flex-col justify-center items-center py-20 mx-20">
            {data.map((person, index)=>{
                return (
                <div  key={person.id} className="flex flex-row py-2 my-2 bg-gray-200 rounded w-full justify-between">
                            <div className={tdStyles}>
                                <label className={labelStyles}>Order</label>
                                <div>{person.order}</div>
                            </div>
                            <div className={tdStyles}>
                                <label className={labelStyles}>Name</label>
                                <div>{person.name}</div>
                            </div>
                            <div className={tdStyles}>
                                <label className={labelStyles}>Email</label>
                                <div>{person.email}</div>
                            </div>
                            <div className={tdStyles}>
                                <label className={labelStyles}>Phone #</label>
                                <div>{person.phoneNumber}</div>
                            </div>
                        </div>
                )
            })}
        </div>
        </div>
    )
}

export default DnD;