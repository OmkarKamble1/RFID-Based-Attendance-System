import { query } from '../utils/dbConnect.js'

const teacherLogin = async (req, res) => {
	const { phone, password } = req.body;
	const { rows } = await query('SELECT * FROM teacher WHERE phone = $1 AND password = $2', [phone, password]);
	if(rows.length > 0) {
		res.status(200).json({
			success: true,
			message: 'Log in successful',
			first_name: rows[0].first_name,
			last_name: rows[0].last_name,
			teacher_id: rows[0].teacher_id,
		});
	} else {
		res.status(400).json({success: false, message: 'Log in unsuccessful'});
	}
}

export default teacherLogin;