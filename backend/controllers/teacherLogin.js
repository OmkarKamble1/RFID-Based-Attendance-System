import { query } from '../utils/dbConnect.js'

const teacherLogin = async (req, res) => {
	// req.session.user = {teacher_id: '123sdwe'};
	// req.session.authenticated = true;
	res.send('<h1>Teacher Login</h1>')
}

export default teacherLogin;