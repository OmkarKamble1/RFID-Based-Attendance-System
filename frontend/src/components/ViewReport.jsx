import React from 'react'
import Header from './partials/header'
import { collegeData } from '../../utils/collegeData'
import StudentTable from './StudentTable'

const semesters = Object.keys(collegeData.IT)

const data = [
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  { name: 'Alice', id: '001', attendance: 'Present' },
  { name: 'Bob', id: '002', attendance: 'Absent' },
  { name: 'Charlie', id: '003', attendance: 'Present' },
  // Dummy data
];


export default function ViewReport() {
  return (
    <div>
      <Header />
      <div className='bg-violet-100 h-[90vh] flex flex-wrap justify-center'>
          <div className='w-screen  h-40 p-10 flex flex-wrap justify-evenly w-[90%]  border-b-2 border-slate-300 '>

            <div className='w-[10vw] text-xl '>
              <h1>Branch:</h1>
              <select name="branch" id="branch" className="w-[10vw]">
                {
                  Object.keys(collegeData).map(x => <option key={x} value={x}> {x} </option>)
                }
              </select>
            </div>

            <div className=' w-[10vw] text-xl  '>
              <h1>Semester:</h1>
              <select name="semester" id="semester"  className="w-[10vw]">
                {
                  Object.values(semesters).map(x => <option key={x} value={x}>{x}</option>)
                }
              </select>
            </div>

            <div className=' w-[10vw] text-xl '>
              <h1>Division:</h1>
              <select name="division" id="division" className="w-[10vw]">
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <div className=' w-[10vw] text-xl '>
              <h1>Subjects:</h1>
              <select name="subjects" id="subjects" className="w-[10vw]">
                
              </select>
            </div>

                <button className='bg-violet-500 text-white rounded-md h-10 p-2 mt-5 flex flex-wrap content-center justify-center'>Fetch results</button>
      
          </div>
          {/* <ReportTable studentData={studentData}/> */}
          <div className=' max-h-[60vh] bg-white p-10 rounded-xl'>
            <h1 className='text-xl '>Attendance Report</h1>
            <div className='max-h-[50vh] overflow-y-scroll overflow-x-hidden '>
              <StudentTable data={data} />
            </div>
          </div>
      </div> 
    </div>
  )
}
