import { query } from '../utils/dbConnect.js';
import { differenceInMinutes, isAfter, isBefore } from 'date-fns';
import { endLectureTimeout } from '../utils/endLecture.js';

const createLecture = async (req, res) => {

	const { branch, sem, div, subject, start_time, end_time } = req.body;

	const { rows: lectureRows } = await query('SELECT * FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND is_active = $4', [branch, sem, div, true]);

	const teacher_id = req.session.user.teacher_id;

	// * check if there are any overlapping lectures by other teachers
	lectureRows.forEach((l) => {
		const overlap = !(isBefore(l.end_time, start_time) || isAfter(l.start_time, end_time));
		if(overlap) {
			res.status(400).json({
				success: false,
				message: 'Lecture overlaped',
				data: {
					overlapped_subject: l.subject
				}
			});
			return;
		}
	});

	const { rows } = await query('INSERT INTO lecture_session (teacher_id, branch, sem, div, subject, is_active, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING lecture_id', [teacher_id, branch, sem, div, subject, true, start_time, end_time]);

	const duration = differenceInMinutes(end_time, start_time);

	endLectureTimeout(rows[0].lecture_id, duration);

	res.status(201).json({
		success: true,
		message: 'Lecture created',
	})

}

export default createLecture;