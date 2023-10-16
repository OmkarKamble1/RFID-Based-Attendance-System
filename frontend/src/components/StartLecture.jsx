import React from 'react'
import Header from './partials/header'
import { Link } from 'react-router-dom'

export default function StartLecture() {
  return (
    <>
        <div className='relative min-h-[70vh] w-screen '>
            <div className='p-10'>
                <h1 className='text-5xl border-b-2 border-slate-300 pb-10'>Start a lecture</h1>
            </div>
            <div className='min-h-[55vh]  flex flex-col  '>
                <div className='border-b-2 border-slate-300' >
                    <div className='  py-6 flex justify-center '>
                            <h1 className='text-2xl'> Select branch: </h1>
                        
                            <select name="branch" id="branch" className='mx-5 bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" " >--select branch</option>
                                <option value="it">Information Technology</option>
                                <option value="cs">Computer Science</option>
                            </select>
            
                    </div>
                    <div className=' py-6  flex justify-center'>
                            <h1 className='text-2xl'> Select Semester: </h1>
                        
                            <select name="branch" id="semester" className='mx-5 bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" " >--select semester</option>
                                <option value="7">VII</option>
                                
                            </select>
            
                    </div>
                    <div className=' py-6 flex justify-center'>
                            <h1 className='text-2xl'> Select Subject: </h1>
                        
                            <select name="branch" id="semester" className='mx-5 bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" " >--select subjectr</option>
                                <option value="7">VII</option>
                                
                            </select>
            
                    </div>
                    <div className=' py-6 flex justify-center'>
                            <h1 className='text-2xl'> Select Division: </h1>
                            <select name="branch" id="division" className='mx-5 bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" ">--select division</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                            </select>
                    </div>
                    <div className=' py-6  flex justify-center'>
                            <h1 className='text-2xl'> Time Duration: </h1>
                            <select name="branch" id="division" className='mx-5 bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" ">--time duration</option>
                                <option value="a">30 min</option>
                                <option value="b">45 min</option>
                                <option value="b">60 min</option>
                                <option value="b">90 min</option>
                            </select>
                    </div>
                    <div className='py-6  flex flex-col justify-center'>
                        <h1 className='text-2xl'>Schedule</h1>
                    </div>
                        <input type='time' value='time'className=' mx-5 bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'></input>
                    

                </div>
                <div className='w-[100vw] py-5 border-l-2 border-slate-400 flex flex-wrap justify-center content-center'>
                    <Link to={"/lecture"} className='bg-blue-500
                     text-white w-40 h-17 flex flex-wrap justify-center 
                     content-center text-2xl rounded-xl hover:shadow-2xl transition duration-300
                     '>Start lecture</Link>
                </div>
            </div>
            
            
            
        </div>  
    </>
  )
}
