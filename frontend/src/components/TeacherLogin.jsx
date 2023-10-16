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
        <div id='teacherLogin' className='relative min-h-[90vh] w-screen bg-violet-100 flex flex-wrap content-center justify-center '>
            <div id='loginContainer' className='realtive min-h-[40vh] min-w-[30vw] bg-white rounded-xl shadow-xl flex flex-wrap flex-col place-content-around'>
                <h2 className='font-bold text-4xl p-3'>Teacher login.</h2>
                <div className='flex flex-col p-3 justify-center'>
                    <input className='border-b-2 h-20 w-[100%] focus:outline-1 focus:outline-slate-100 ' type="text" name="teacherName" id="teacherName" placeholder='Name'/>
                    <input className='border-b-2 h-20 w-[100%] focus:outline-1 focus:outline-slate-100' type="text" name="teacherPassword" id="teacherPassword" placeholder='password'/>
                </div>
                {/* <button onClick={openModal} className='bg-violet-700 text-white rounded-md h-10 mb-5' >Log In /Open modal</button> */}
            </div>
            <Link to={'/Welcome'}>LOg In</Link>
        </div>
		<button >Open Modal</button>
		 {/* <Modal isOpen={isModalOpen} onClose={closeModal}> 
			<h2>Modal Content</h2>
			<p>This is the content of the modal.</p>
		</Modal> */}
        <Footer />
    </>
  )
}
