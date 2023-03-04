"use client"
import { ClipLoader } from 'react-spinners';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useGlobalContext } from '../Context/store';

const ProjectDetails = () => {
    const { project, setProject } = useGlobalContext();

    console.log(project)
    return (
        <>  
            <div className="w-3/4 py-6 flex flex-row items-center justify-evenly">
                <h1 className='text-6xl font-bold'>{project.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 ml-6 w-1/2">{moment(project.startDate).format("MMMM Do YYYY")} - {moment(project.endDate).format("MMMM Do YYYY")}</p>
            </div>
        </>
    )
}

export default ProjectDetails;