import React from 'react';
import {GrFormClose} from 'react-icons/gr';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" >
      <div className="absolute w-full h-full bg-gray-800 opacity-30 cursor-pointer" onClick={onClose}></div>
      <div className="bg-white w-96 md:w-1/2 mx-auto rounded-2xl shadow-lg z-50 relative">
			<div className="p-5">
			{children}          
			</div>
			<button className="mt-4 absolute right-2 -top-2 p-[1px] hover:bg-gray-200 rounded-full transition-colors" onClick={onClose}>
				<GrFormClose color='#202020' size='25px'/>
			</button>
      </div>	  
    </div>
  );
};

export default Modal;
