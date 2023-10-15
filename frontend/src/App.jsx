import TeacherLogin from "./components/TeacherLogin";
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import MainPage from "./components/MainPage";
import StartLecture from "./components/StartLecture";
import ViewReport from "./components/ViewReport";

function App() {
  return (
	<div className='overflow-x-hidden font-poppins'>
		{/* <h1 className="text-5xl font-bold">Attendance Dashboard</h1> */}
		<BrowserRouter>
			<Routes>
				<Route exact path='/' element={<TeacherLogin />} />
				<Route exact path='/welcome' element={<MainPage />} />
				<Route exact path='/start' element={<StartLecture />} />
				<Route exact path='/reports' element={<ViewReport />} />
			</Routes>
		</BrowserRouter>
	</div>
  );
}

export default App
