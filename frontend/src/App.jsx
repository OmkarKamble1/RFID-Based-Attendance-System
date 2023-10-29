import TeacherLogin from "./components/TeacherLogin";
import { BrowserRouter, Routes, Route, useNavigate  } from 'react-router-dom';
import MainPage from "./components/MainPage";
import StartLecture from "./components/StartLecture";
import ViewReport from "./components/ViewReport";
import Header from './components/partials/header'
import StudentReport from './components/StudentReport';

function App() {
  return (
	<div className='overflow-x-hidden font-sans min-h-[calc(100vh-00px)] from-fuchsia-100 to-blue-100 bg-gradient-to-tl'>
		<BrowserRouter>
		<Header />
			<Routes>
				<Route exact path='/login' element={<TeacherLogin />} />
				<Route exact path='/' element={<MainPage />} />
				<Route exact path='/lecture' element={<StartLecture />} />
				<Route exact path='/report' element={<ViewReport />} />
				<Route exact path='/a/:id' element={<StudentReport />} />
				<Route path='/*' element={<div className='h-full flex items-center justify-center flex-col font-semibold text-2xl mt-20'><h1>404</h1><h1>NOT FOUND</h1></div>} />
			</Routes>
		</BrowserRouter>
	</div>
  );
}

export default App
