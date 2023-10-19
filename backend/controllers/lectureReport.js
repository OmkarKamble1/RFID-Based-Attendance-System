import { parse } from 'date-fns';
import { query } from '../utils/dbConnect.js';

const lectureReport = async (req, res) => {
	const { branch, sem, division, subject, date } = req.body;

	const { rows: lectureRows } = await query('SELECT * FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND subject = $4 AND DATE(created_at) = $5', [branch, sem, division, subject, date]);
	
	if(lectureRows.length <= 0){
		res.status(404).json({
			success: false,
			message: 'Lecture not found'
		})
		return;
	}

	const teacher_id = req.session.user.teacher_id;
	// const teacher_id = '4e372700-aad7-4474-a66d-3dd335671528';

	
	const attendanceArr = await Promise.all(lectureRows.map(async (row) => {

		const lecture_id = row.lecture_id;

		const { rows: attendanceRows } = await query(`SELECT student.first_name, student.last_name, student.id, TO_CHAR(attendance.attended_at, 'DD-MM-YY HH24:MI:SS') AS attended_at FROM attendance JOIN student ON attendance.student_id = student.student_id WHERE attendance.teacher_id = $1 AND attendance.lecture_id = $2`, [teacher_id, lecture_id]);
		
		return attendanceRows;

	}))

	const mergedArr = [].concat(...attendanceArr);

	const { rows: totalLectures } = await query('SELECT COUNT(*) FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND subject = $4', [branch, sem, division, subject]);

	const resultArr = await Promise.all(mergedArr.map(async (studentData) => {
		
		const { rows: studentLectures } = await query('SELECT COUNT(student.id)	FROM student JOIN (SELECT ad.student_id FROM attendance AS ad JOIN lecture_session AS l ON ad.lecture_id = l.lecture_id WHERE l.branch = $1 AND l.sem = $2 AND l.div = $3 AND l.subject = $4) AS subtable ON subtable.student_id = student.student_id WHERE student.id = $5', [branch, sem, division, subject, studentData.id]);

		return {
			...studentData,
			attendance_percentage: `${(studentLectures[0].count / totalLectures[0].count) * 100}%`
		}

	}));

	res.status(200).json({
		success: true,
		message: 'Lecture reports fetched successfully',
		data: resultArr
	});

}

export default lectureReport