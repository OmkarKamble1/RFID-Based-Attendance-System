import { query } from '../utils/dbConnect.js';

const lectureStatus = async (req, res) => {	
	const teacher_id = req.session.user.teacher_id;
	const { rows } = await query('SELECT * FROM lecture_session WHERE teacher_id = $1 AND DATE(created_at) = CURRENT_DATE', [teacher_id]);

	if(rows.length <= 0) {
		res.status(404).json({
			success: false,
			message: 'Lecture not found'
		})
		return;
	}
	
	rows.forEach((lecture) => {
		if(lecture.is_active === true) {
			res.status(200).json({
				success: true,
				message: 'Lecture is active',
				data: lecture
			})
			return;
		}
	});

	res.status(200).json({
		success: true,
		message: 'Lecture not active'
	});
}

export default lectureStatus;