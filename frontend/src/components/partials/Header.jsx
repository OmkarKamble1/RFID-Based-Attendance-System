import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  return (
    <div id='header' className='relative w-full bg-white bg-opacity-70 border-b-2 h-[70px] flex px-14 rounded-br-3xl rounded-bl-3xl items-center justify-start text-blue-950 shadow-md'>
        <h1 className='text-3xl font-semibold flex gap-3 items-center'><img className='w-14' src='https://www.pvppcoe.ac.in/vppcoa/assets/img/VISUAL%20ART%20LOGO%201%20(1).png'/> Attendance Dashboard</h1>
    </div>
  )
}
