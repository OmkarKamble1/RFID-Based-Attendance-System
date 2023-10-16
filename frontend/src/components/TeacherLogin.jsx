import React, { useState } from 'react'
import Header from './partials/header'
import Footer from './partials/Footer'
import { Link } from 'react-router-dom'
import Modal from './Modal'


export default function TeacherLogin() {
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
    <>
        <Header />
        { <div className='relative min-h-[90vh] w-screen bg-violet-100 flex flex-wrap content-center justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Teacher Login</h2>
                <div className='flex flex-col py-2'>
                    <input className="p-2 mt-8 rounded-xl border"  placeholder="Name" type='text'/>
                </div>
                <div className='flex flex-col py-2'>
                <input className="p-2 mt-5 rounded-xl border"  placeholder="Password" type='password' />

            <Link to={'/Welcome'}>
            <button className='bg-violet-700 hover:bg-violet-900 mt-5 text-white rounded-md h-10 mb-5 w-full'>Login</button>
            </Link>
            </form>
        </div>}
     
        <Footer />
    </>
  )
}
