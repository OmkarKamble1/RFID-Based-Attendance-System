import React, { useEffect, useState } from 'react'
import { format, addMinutes, setHours, setMinutes, parse, isBefore, isPast, isSameMinute } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'

export default function StartLecture() {
	const [branch, setbranch] = useState(null);
	const [sem, setsem] = useState(null);
	const [div, setdiv] = useState(null);
	const [subject, setsubject] = useState(null);
	const [selectedOption, setSelectedOption] = useState('one')
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [duration, setduration] = useState(null);

	const [resMsg, setresMsg] = useState('');

	const handleStartTimeChange = (e) => {
		setStartTime(e.target.value);
	};

	const handleEndTimeChange = (e) => {
		setEndTime(e.target.value);
	};

	const handleRadioChange = (e) => {
		setSelectedOption(e.target.value);
	};

	const onStartClick = async () => {
		const btn = document.getElementById('start-lec-btn')

		if(branch && sem && div && subject && selectedOption){
			let lectureStart, lectureEnd;
			const currentDate = new Date();
			if(selectedOption === 'one') {
				if(duration) {
					lectureStart = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
					lectureEnd = format(addMinutes(currentDate, duration), 'yyyy-MM-dd HH:mm:ss');
				} else {
					window.alert('Enter duration')
				}
			}
			else {
				if(startTime && endTime) {
					const [sgivenHour, sgivenMinute] = startTime.split(':').map(Number);
					lectureStart = format(setMinutes(setHours(currentDate, sgivenHour), sgivenMinute), 'yyyy-MM-dd HH:mm:ss');
					const [egivenHour, egivenMinute] = endTime.split(':').map(Number);
					lectureEnd = format(setMinutes(setHours(currentDate, egivenHour), egivenMinute), 'yyyy-MM-dd HH:mm:ss');
					const parsedStartDate = parse(lectureStart, 'yyyy-MM-dd HH:mm:ss', new Date());
					const parsedEndDate = parse(lectureEnd, 'yyyy-MM-dd HH:mm:ss', new Date());
					if (isPast(parsedStartDate)) {
						btn.disabled = false;
						window.alert('Invalid start time');
						return;
					} else if (isBefore(parsedEndDate, parsedStartDate)) {
						btn.disabled = false;
						window.alert('Invalid end time');
						return;
					} else if (isSameMinute(parsedStartDate, parsedEndDate) || isBefore(parsedEndDate, addMinutes(parsedStartDate, 5))) {
						btn.disabled = false;
						window.alert('The end time should be at least 5 minutes after the start time');
						return;
					}
				} else {
					window.alert('Enter schedule time')
				}
			}
			// send req			
			btn.disabled = true;

			await axios.post('http://localhost:3001/teacher/lecture/create',
			{
				branch: branch,
				sem: sem,
				div: div,
				subject: subject,
				start_time: lectureStart,
				end_time: lectureEnd
			},
			{
				withCredentials: true,
				baseURL: 'http://localhost:3001/'
			})
			.then((r) => {
				console.log(r.data)
				openModal();
				btn.disabled = false;
				setresMsg('Lecture created !');
			})
			.catch((e) => {
				console.log(e.response.data)
				setresMsg(`Lecture overlapped with ${e.response.data.data.overlapped_subject}`);
				openModal();
				btn.disabled = false;
				if(e.response.data.message === 'User not logged in') navigate('/login')
			})
			console.log(branch, sem, div, subject, lectureStart, lectureEnd);
		} else {
			window.alert('Enter all details')
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:3001/teacher/login',
		{
			withCredentials: true,
			baseURL: 'http://localhost:3001/'
		})
		.catch(() => navigate('/login'))
	}, [])
	
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	}

	const closeModal = () => {
		setIsModalOpen(false) 
		document.body.classList.remove('overflow-hidden');
	}

  return (
	<div className='relative min-h-[calc(100vh-70px)] w-screen flex justify-center py-10'>
		<div className='max-w-[550px] h-fit max-sm:max-w-[440px] w-full bg-white py-12 px-8 rounded-2xl items-center flex flex-col '>			
			<div className='grid grid-cols-2 gap-y-5 w-full'>
				<h1 className='text-xl flex justify-end text-blue-900 mr-7'> Select branch: </h1>
				<select value={branch} onChange={(e) => setbranch(e.target.value)} name="branch" id="branch" className='rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-2 mr-10'>
					<option value="" >Branch</option>
					<option value="IT">IT</option>
					<option value="CS">CS</option>
				</select>
				<h1 className='text-xl flex justify-end text-blue-900 mr-7'> Select Semester: </h1>
				<select value={sem} onChange={(e) => setsem(e.target.value)} name="branch" id="semester" className='rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-2 mr-10'>
					<option value=" " >Semester</option>
					<option value="7">7</option>
					{/* <option value="8">8</option> */}
				</select>
				
				<h1 className='text-xl flex justify-end text-blue-900 mr-7'> Select Division: </h1>
				<select value={div} onChange={(e) => setdiv(e.target.value)} name="branch" id="division" className='rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-2 mr-10'>
					<option value=" ">Division</option>
					<option value="A">A</option>
					<option value="B">B</option>
				</select>
				<h1 className='text-xl flex justify-end text-blue-900 mr-7'> Select Subject: </h1>					
				<select value={subject} onChange={(e) => setsubject(e.target.value)} name="branch" id="semester" className='rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-2 mr-10'>
					<option value=" " >Subject</option>
					<option value="AIDS 2">AIDS 2</option>
					<option value="IOE">IOE</option>					
					<option value="STQA">STQA</option>					
					<option value="IRS">IRS</option>					
					<option value="CSL">CSL</option>
				</select>

				<div className='col-span-2 bg-slate-100 py-4 rounded-xl'>
					<div className="flex justify-center gap-10 ">
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								className="form-radio text-blue-600"
								name="radioGroup"
								value="one"
								checked={selectedOption === 'one'}
								onChange={handleRadioChange}
							/>
							<span className="ml-2 text-lg flex justify-end text-blue-900">Duration</span>
						</label>

						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								className="form-radio text-blue-600"
								name="radioGroup"
								value="two"
								checked={selectedOption === 'two'}
								onChange={handleRadioChange}
							/>
							<span className="ml-2 text-lg flex justify-end text-blue-900">Schedule</span>
						</label>
					</div>
					<div className='flex justify-center w-full col-span-2'>
						{
							selectedOption === 'one' ?
							<div className='p-3 w-full flex justify-center rounded-xl'>
								<select value={duration} onChange={(e) => setduration(e.target.value)} name="duration" id="duration" className='rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-5'>
									<option value=" " >Duration minutes</option>
									<option value="1">1 minute</option>
									<option value="5">5 minutes</option>
									<option value="15">15 minutes</option>
									<option value="30">30 minutes</option>
									<option value="45">45 minutes</option>
									<option value="60">60 minutes</option>
								</select>
							</div>
							:
							<div className="w-full flex gap-x-4 justify-center p-3 rounded-xl">
								<div className="flex items-center">
									<label htmlFor="startTime" className="mr-2 block text-lg justify-end text-blue-900">
									Start Time:
									</label>
									<input
									type="time"
									id="startTime"
									name="startTime"
									className="form-input rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-2"
									value={startTime}
									onChange={handleStartTimeChange}
									/>
								</div>
								<div className="flex items-center">
									<label htmlFor="endTime" className="mr-2 block text-lg justify-end text-blue-900">
									End Time:
									</label>
									<input
									type="time"
									id="endTime"
									name="endTime"
									className="form-input rounded-lg border bg-blue-50 outline-none focus:ring-1 focus:ring-blue-500 py-1 px-2"
									value={endTime}
									onChange={handleEndTimeChange}
									/>
								</div>
							</div>
						}
					</div>
				</div>
				
			</div>
			<button id='start-lec-btn' onClick={onStartClick}  className='bg-blue-700 hover:bg-blue-800 transition-colors text-white rounded-xl py-3 text-lg font-semibold w-fit px-20 mt-7'>Start lecture</button>
		</div>
		<Modal isOpen={isModalOpen} onClose={closeModal}>
			<div className='flex flex-col items-center p-10'>
				<img className='aspect-square w-28' src={resMsg.includes('created') ? 'correct.png': 'wrong.png'} />
				<h2 className='text-3xl mt-6 font-semibold'>{resMsg}</h2>
			</div>
		</Modal>
	</div> 
  )
}
