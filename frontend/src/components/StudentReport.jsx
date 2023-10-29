import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentReport = () => {
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState();

	const getStudentData = async () => {
		await axios.post('http://localhost:3001/student/studentAttendanceReport',
			{
				id: id
			},
			{
				withCredentials: true,
				baseURL: 'http://localhost:3001/'
			})
			.then((r) => {
				console.log(r.data)
				setData(r.data.data)
				setLoading(false)
			})
			.catch((e) => {
				console.log(e.response.data)
				if(!e.response.data.success) {
					setData(false)
				} else {
					document.getElementById('err').innerHTML = 'Server error';
				}
				setLoading(false)
			})
	}

	useEffect(() => {
		getStudentData();
	}, []);

	return (
		<div className='min-h-[calc(100vh-70px)] w-screen flex justify-center items-center'>
			<div className='w-fit h-fit bg-white rounded-xl py-10 px-16'>
				{
					loading ? 
					<div className='flex flex-col items-center'>
						<img className='aspect-square h-14' src='/loading.gif' />
						<h2 className='mt-3 text-2xl text-blue-950 font-semibold'>Loading attendace data</h2>
					</div> :
					!data ? 
					<div className='flex flex-col items-center'>
						<img className='aspect-square h-32' src='/wrong.png' />
						<h2 id='err' className='mt-3 text-2xl text-blue-950 font-semibold'>Student not found</h2>
					</div> :
					<div className='flex flex-col items-center'>
						<img className='aspect-square h-32' src='/person.png' />
						<h2 className='mt-3 text-[26px] text-blue-950 font-semibold'>{data.name}</h2>					
						<div className='flex text-lg gap-2 items-center text-slate-500 mt-1'>
							<p className='font-semibold'>{data.id}</p>
							<span className='h-2 w-2 bg-slate-500 rounded-full'/>
							<p className='font-semibold'>{data.rfid_id}</p>
						</div>	
						<div className='flex gap-2 items-center text-slate-400 mt-1'>
							<p className='font-semibold'>Branch: {data.branch}</p>
							<span className='h-1 w-1 bg-slate-400 rounded-full'/>
							<p className='font-semibold'>Sem: {data.sem}</p>
							<span className='h-1 w-1 bg-slate-400 rounded-full'/>
							<p className='font-semibold'>Div: {data.div}</p>
							
						</div>
						<div className='flex mt-7 gap-5'>
							<div className='bg-gray-100 p-5 rounded-2xl text-2xl flex flex-col items-center  justify-center'>
								<p className='text-slate-700  text-xl  font-semibold'>Attended</p>
								<p className='text-slate-800 font-bold'>{data.attended}</p>
							</div>

							<div className='bg-gray-100 p-7 rounded-2xl flex flex-col items-center justify-center'>
								<p className='text-blue-900 text-4xl  font-bold'>{data.attendancePercentage}%</p>
							</div>

							<div className='bg-gray-100 p-5 rounded-2xl text-2xl flex flex-col items-center  justify-center'>
								<p className='text-slate-700 text-xl font-semibold'>Conducted</p>
								<p className='text-slate-800 font-bold'>{data.conducted}</p>
							</div>

						</div>					
					</div>
				}
				

				
			</div>			
		</div>
	)
}

export default StudentReport