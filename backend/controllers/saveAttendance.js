import { query } from '../utils/dbConnect.js';
import { devConsole } from '../utils/miscellaneous.js';

const saveAttendance = async (req, res) => {

	const { uid } = req.body;

	const rfid_uid = String(uid).trim().toUpperCase();
	
	devConsole(rfid_uid);

	const { rows: studentRow } = await query('SELECT * FROM student WHERE rfid_uid = $1', [rfid_uid]);

	// console.log(studentRow);

	if(studentRow == 0){
		res.status(404).json({
			success: false,
			message: "Not registered"
		})
		return;
	}

	const { student_id, branch, sem, div } = studentRow[0];

	const { rows: sessionRow } = await query('SELECT lecture_id, teacher_id FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND is_active = $4', [branch, sem, div, true]);

	if(sessionRow.length <= 0) {
		res.status(403).json({
			success: false,
			message: "No active lec"
		})
		return;
	}

	const { lecture_id, teacher_id } = sessionRow[0];

	const { rows: attendanceRow } = await query('SELECT * FROM attendance WHERE lecture_id = $1 AND teacher_id = $2 AND student_id = $3', [lecture_id, teacher_id, student_id]);

	if(attendanceRow.length > 0){
		res.status(401).json({
			success: false,
			message: "Already saved"
		})
		return;
	}

	await query('INSERT INTO attendance (student_id, teacher_id, lecture_id) VALUES ($1, $2, $3)', [student_id, teacher_id, lecture_id]);
	 
	res.status(200).send(JSON.stringify({
		success: true,
		message: "Attendance saved"
	}));

}

export default saveAttendance;