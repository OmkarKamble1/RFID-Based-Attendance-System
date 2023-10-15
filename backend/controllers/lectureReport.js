import { query } from '../utils/dbConnect.js';

const lectureReport = async (req, res) => {
	const { branch, sem, div, subject, date } = req.body;
	const { rows: lectureRows } = await query('SELECT * FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND subject = $4 AND date = $5', [branch, sem, div, subject, date]);

	if(lectureRows.length <= 0){
		res.status(404).json({
			success: false,
			message: 'Lecture not found'
		})
		return;
	}

	const teacher_id = req.session.user.teacher_id;
	const { lecture_id } = lectureRows[0];

	const { rows: attendanceRows } = await query('SELECT student.first_name, student.last_name, student.id, attendance.attended_at FROM attendance JOIN student ON attendance.student_id = student.student_id WHERE attendance.teacher_id = $1 AND attendance.lecture_id = $2', [teacher_id, lecture_id]);

	res.status(200).json({
		success: true,
		message: 'Lecture reports fetched successfully',
		data: attendanceRows
	});

}

export default lectureReport