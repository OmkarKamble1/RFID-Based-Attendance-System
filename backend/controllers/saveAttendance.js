import { query } from '../utils/dbConnect';

const saveAttendance = async (req, res) => {

	const { uid } = req.body;

	const { rows: studentRow } = await query('SELECT student_id, branch, sem, div FROM students WHERE uid = $1', [uid]);

	if(studentRow == 0){
		res.status(404).json({
			success: false,
			message: "Unregistered"
		})
		return;
	}

	const { student_id, branch, sem, div } = studentRow[0];

	const { rows: sessionRow } = await query('SELECT lecture_id, teacher_id FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND is_active = $4', [branch, sem, div, true]);

	if(sessionRow.length <= 0) {
		res.status(403).json({
			success: false,
			message: "No lecture found"
		})
		return;
	}

	const { lecture_id, teacher_id } = sessionRow[0];

	await query('INSERT INTO attendance (students_id, teacher_id, lecture_id) VALUES ($1, $2, $3)', [student_id, teacher_id, lecture_id]);
	 
	res.status(200).send(JSON.stringify({
		success: true,
		message: "Attendance saved"
	}));

}

export default saveAttendance;