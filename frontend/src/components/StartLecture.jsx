import React from 'react'
import Header from './partials/header'
import { Link } from 'react-router-dom'

export default function StartLecture() {
  return (
    <>
        <Header />
        <div className='relative min-h-[90vh] w-screen bg-violet-100'>
            <div className='p-10'>
                <h1 className='text-6xl border-b-2 border-slate-300 pb-10'>Start a lecture</h1>
            </div>
            <div className='min-h-[55vh]  flex flex-wrap'>
                <div className='w-[50vw]' >
                    <div className='p-10 '>
                            <h1 className='text-2xl'> Select branch: </h1>
                        
                            <select name="branch" id="branch" className='m-5 bg-violet-200 focus:outline-1 focus:outline-slate-100 w-[15vw]'>
                                <option value=" " >--select branch</option>
                                <option value="it">Information Technology</option>
                                <option value="cs">Computer Science</option>
                            </select>
            
                    </div>
                    <div className='p-10'>
                            <h1 className='text-2xl'> Select Semester: </h1>
                        
                            <select name="branch" id="semester" className='m-5 bg-violet-200 focus:outline-1 focus:outline-slate-100 w-[15vw]'>
                                <option value=" " >--select semester</option>
                                <option value="7">VII</option>
                                
                            </select>
            
                    </div>
                    <div className='p-10'>
                            <h1 className='text-2xl'> Select Division: </h1>
                        
                            <select name="branch" id="division" className='m-5 bg-violet-200 focus:outline-1 focus:outline-slate-100 w-[15vw]'>
                                <option value=" ">--select division</option>
                                <option value="a">A</option>
                                <option value="b">B</option>
                            </select>
            
                    </div>
                </div>
                <div className='w-[50vw] border-l-2 border-slate-400 flex flex-wrap justify-center content-center'>
                    <Link to={"/lecture"} className='bg-violet-500 text-white w-80 h-40 flex flex-wrap justify-center content-center text-3xl rounded-xl hover:shadow-2xl transition duration-300'>Start lecture</Link>
                </div>
            </div>
            <div>
                Time select
            </div>
            
            
        </div>  
    </>
  )
}
