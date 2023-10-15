import React from 'react'
import Header from './partials/header'
import Footer from './partials/Footer'
import { Link } from 'react-router-dom'

export default function TeacherLogin() {
  return (
    <>
        <Header />
        <div id='teacherLogin' className='relative min-h-[90vh] w-screen bg-violet-100 flex flex-wrap content-center justify-center '>
            <div id='loginContainer' className='realtive min-h-[40vh] min-w-[30vw] bg-white rounded-xl shadow-xl flex flex-wrap flex-col place-content-around'>
                <h2 className='font-bold text-4xl p-3'>Teacher login.</h2>
                <div className='flex flex-col p-3 justify-center'>
                    <input className='border-b-2 h-20 w-[100%] focus:outline-1 focus:outline-slate-100 ' type="text" name="teacherName" id="teacherName" placeholder='Name'/>
                    <input className='border-b-2 h-20 w-[100%] focus:outline-1 focus:outline-slate-100' type="text" name="teacherPassword" id="teacherPassword" placeholder='password'/>
                </div>
                {/* <button className='bg-violet-500 text-white rounded-md h-10 mb-5' >Log In</button> */}
                <Link to={'/welcome'} className='bg-violet-500 text-white rounded-md h-10 mb-5 flex flex-wrap content-center justify-center'> Log In </Link>
            </div>
        </div>
        <Footer />
    </>
  )
}
