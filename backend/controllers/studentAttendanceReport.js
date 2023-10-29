import { query } from '../utils/dbConnect.js';
import { devConsole } from '../utils/miscellaneous.js';

const studentAttendanceReport = async (req, res) => {	
	const { id } = req.body;

	devConsole(id);
	
	const { rows: studentRows } = await query('SELECT * FROM student WHERE id = $1', [id]);

	if(studentRows.length <= 0) {
		res.status(401).json({
			success: false,
			message: 'Student not found',
		});
		return;
	}

	const { rows: totalLectures } = await query('SELECT * FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3', [studentRows[0].branch, studentRows[0].sem, studentRows[0].div])

	let studentLectures = 0;

	await Promise.all(totalLectures.map(async (lec) => {
		const { rows } = await query('SELECT * FROM attendance WHERE lecture_id = $1 AND student_id = $2', [lec.lecture_id, studentRows[0].student_id])
		if(rows.length > 0) studentLectures++;
	}));

	const attendancePercentage = (studentLectures * 100 / totalLectures.length).toFixed(0)

	res.status(200).json({
		success: true,
		message: 'Successfully fetched student data',
		data: {
			name: `${studentRows[0].first_name} ${studentRows[0].last_name}`,
			id: studentRows[0].id,
			rfid_id: studentRows[0].rfid_uid,
			branch:  studentRows[0].branch,
			sem: studentRows[0].sem,
			div: studentRows[0].div,
			attended: studentLectures,
			attendancePercentage: attendancePercentage,
			conducted: totalLectures.length
		}
	});
}

export default studentAttendanceReport;