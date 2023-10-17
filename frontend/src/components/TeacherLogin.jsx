import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function TeacherLogin() {
	const [phone, setPhone] = useState(null);
	const [password, setPassword] = useState(null);
	const navigate = useNavigate();

	const onClickLogin = async () => {
		if(phone && password) {
			if(phone.match(/^[0-9]{10}$/)){
				await axios.post('http://localhost:3001/teacher/login', {
					phone: phone,
					password: password
				},
				{
					withCredentials: true,
					baseURL: 'http://localhost:3001/'
				})
				.then(() => navigate('/'))
				.catch(() => window.alert('Invalid credentials'))
			} else {
				window.alert('Enter valid mobile number')
			}
		} else {
			window.alert('Please enter valid credentials')
		}
	};

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
    <>
       	<div className='min-h-[calc(100vh-70px)] w-screen flex flex-wrap content-center justify-center'>
            <form onSubmit={(e) => e.preventDefault()} className='max-w-[400px] w-full mx-auto bg-white py-12 px-8 rounded-2xl'>
                <h2 className='text-3xl font-semibold text-center text-blue-900'>Teacher Login</h2>
				<input onChange={(e)=> setPhone(e.currentTarget.value)} className="focus:ring-1 focus:outline-none focus:border-sky-500 focus:ring-sky-500  p-2 mt-8 rounded-xl border w-full"  placeholder="Mobile" type='text'/>
                <input onChange={(e)=> setPassword(e.currentTarget.value)} className="focus:ring-1 focus:outline-none focus:border-sky-500 focus:ring-sky-500 p-2 mt-5 rounded-xl border w-full"  placeholder="Password" type='password' />
            <button onClick={onClickLogin} className='bg-blue-700 hover:bg-blue-800 transition-colors mt-8 text-white rounded-xl font-semibold h-10 w-full'>Login</button>
            </form>
        </div>
    </>
  )
}
