import React from 'react'
import Header from './partials/header'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <>
        <Header />
        <div id='teacherLogin' className='relative min-h-[90vh] w-screen bg-violet-100'>
            <div className='p-10'>
                <h1 className='text-6xl border-b-2 border-slate-300 pb-10'>Welcome <span id='teacherName'>Teacher</span> !</h1> 
            </div>
            <div className='m-10 border-b-2 border-slate-300 h-20 w-[80vw] my-20'>
                <Link to={'/start'} className='flex flex-wrap content-center text-violet-500 text-2xl hover:bg-violet-200 w-[80vw] h-full transition duration-300 ease-in-out'> Start lecture</Link>
                
            </div>
            <div className='m-10 border-b-2 border-slate-300 h-20 w-[80vw] '>
                <Link to={'/reports'} className='flex flex-wrap content-center text-violet-500 text-2xl hover:bg-violet-200 w-[80vw] h-full transition duration-300 ease-in-out'> View reports</Link>
                
            </div>
        </div>
    </>
  )
}
