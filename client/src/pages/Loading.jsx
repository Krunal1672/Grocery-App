import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'

const Loading = () => {
    const {navigate} = useContext(AppContext)

    const {search}= useLocation();

    const query = new URLSearchParams(search);

    const nextUrl = query.get("next")

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`${nextUrl}`)
            },3000)
        }
    },[nextUrl])
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-400 border-b-primary'></div>
    </div>
  )
}

export default Loading