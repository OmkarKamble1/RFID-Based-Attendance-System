import { query } from '../utils/dbConnect.js'

const teacherLogin = async (req, res) => {
	const { phone, password } = req.body;
	const { rows } = await query('SELECT * FROM teacher WHERE phone = $1 AND password = $2', [phone, password]);
	if(rows.length <= 0) {
		res.status(404).json({
			success: false,
			message: "Invalid credentials"
		})
		return;
	}
	req.session.user = { teacher_id: rows[0].teacher_id };
	req.session.authenticated = true;
	
	console.log(req.session.user);
	console.log(req.session.authenticated);
	res.status(200).json({
		success: true,
		message: "Teacher login successful"
	})
}

export default teacherLogin;