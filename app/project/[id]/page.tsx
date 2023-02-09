"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useGlobalContext } from '../../Context/store';


export default function project () {
    // const router = useRouter()
    // const { id } = router.query
    const { projects, setProjects } = useGlobalContext();

return(
    <main>
        <h1>hello</h1>
    </main>
)

}