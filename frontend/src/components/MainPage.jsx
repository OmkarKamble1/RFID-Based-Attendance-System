import React, { useEffect } from 'react'
import Header from './partials/header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function () {
	const navigate = useNavigate();
	useEffect(() => {
		axios.get('http://localhost:3001/teacher/login',
		{
			withCredentials: true,
			baseURL: 'http://localhost:3001/'
		})
		.then(() => navigate('/'))
		.catch(() => navigate('/login'))
	}, [])
  return (
    <div className='min-h-screen flex items-center justify-center'>   
		<div className='x-10 bg-white px-12 py-10 rounded-xl w-[430px]'>
			<div className='p-5 text-center'>
				<h1 className='text-3xl pb-5 font-semibold text-blue-900 truncate'>
					Hello, Omkar !
				</h1> 
			</div>

			<Link to={'/lecture'} className='mt-4 block text-center text-white text-lg font-semibold py-3 bg-blue-700 rounded-2xl hover:bg-blue-800 hover:shadow-md transition-colors'>Start Lecture</Link>

			<Link to={'/report'} className='mt-8 block text-center text-blue-800 text-lg font-semibold py-3 bg-transparent border-2 border-blue-700 rounded-2xl hover:bg-slate-100 hover:shadow-md transition-colors'>View Reports</Link>
		</div>
    </div>
  )
}
