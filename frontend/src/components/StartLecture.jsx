import React from 'react'
import Header from './partials/header'
import { Link } from 'react-router-dom'

export default function StartLecture() {
  return (
    <>
        <div className='relative min-h-[90vh] w-screen content-center justify-center '>
            <div className=''>
                <h1 className='text-5xl font-semibold text-center text-blue-900 border-b-2 border-slate-300 pb-10'>Start a lecture</h1>
            </div>
            <div className='min-h-[55vh] max-w-[600px] w-full mx-auto bg-white py-12 px-8 rounded-2xl flex flex-col  '>
                <div className='border-b-2 border-slate-300' >
                    <div className='  py-4 flex justify-center '>
                            <h1 className='text-2xl text-blue-900 '> Select branch: </h1>
                        
                            <select name="branch" id="branch" className='mx-5 rounded-xl border bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" " >--select branch</option>
                                <option value="it">Information Technology</option>
                                <option value="cs">Computer Science</option>
                            </select>
            
                    </div>
                    <div className=' py-4  flex justify-center'>
                            <h1 className='text-2xl text-blue-900 '> Select Semester: </h1>
                        
                            <select name="branch" id="semester" className='mx-5 rounded-xl border bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" " >--select semester</option>
                                <option value="7">VII</option>
                                
                            </select>
            
                    </div>
                    <div className=' py-4 flex justify-center'>
                            <h1 className='text-2xl text-blue-900 '> Select Subject: </h1>
                        
                            <select name="branch" id="semester" className='mx-5 rounded-xl border bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" " >--select subjectr</option>
                                <option value="7">VII</option>
                                
                            </select>
            
                    </div>
                    <div className=' py-4 flex justify-center'>
                            <h1 className='text-2xl text-blue-900 '> Select Division: </h1>
                            <select name="branch" id="division" className='mx-5 rounded-xl border bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" ">--select division</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                            </select>
                    </div>
                    <div className=' py-4 flex justify-center'>
                            <h1 className='text-2xl text-blue-900 '> Time Duration: </h1>
                            <select name="branch" id="division" className='mx-5 rounded-xl border bg-blue-200 rounded-xl border focus:outline-1 focus:outline-slate-100 w-[12vw]'>
                                <option value=" ">--time duration</option>
                                <option value="a">30 min</option>
                                <option value="b">45 min</option>
                                <option value="b">60 min</option>
                                <option value="b">90 min</option>
                            </select>
                    </div>
                    <div className='pb-5  flex flex-col  justify-center'>
                        <h1 className='pl-16 pb-2 ml-4 text-2xl text-blue-900 '>Schedule:</h1>
                        <div className='flex px-4 ml-6'>
                        <h3 className='text-2xl  text-blue-900'>Start</h3>
                        <input type='time' value='start time' className=' mx-5 rounded-xl border bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'></input>
                        
                        <h3 className='text-2xl  text-blue-900'>end</h3>
                        <input type='time' value='start time' className=' mx-5 rounded-xl border bg-blue-200 focus:outline-1 focus:outline-slate-100 w-[12vw]'></input>  
                        </div>
                    </div>
                        
                    

                </div>
                <div className=' bg-blue-700 hover:bg-blue-800 transition-colors mt-8 text-xl
                     text-white rounded-xl mx-8 text-center font-semibold h-10 w-64 '>
                    <button to={"/lecture"}  className=''>Start lecture</button>
                </div>
            </div>
            
            
            
        </div>  
    </>
  )
}
