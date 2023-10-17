import { query } from '../utils/dbConnect.js';
import { differenceInMinutes, isAfter, isBefore, parse } from 'date-fns';
import { endLectureTimeout } from '../utils/endLecture.js';

const createLecture = async (req, res) => {

	const { branch, sem, div, subject, start_time, end_time } = req.body;
	//! ex -> IT 7 B IOE 2023-10-18 01:40:06 2023-10-18 02:00:06
	console.log(branch, sem, div, subject, start_time, end_time);
	const { rows: lectureRows } = await query('SELECT * FROM lecture_session WHERE branch = $1 AND sem = $2 AND div = $3 AND is_active = $4', [branch, sem, div, true]);

	const teacher_id = req.session.user.teacher_id;

	const parsedStartDate = parse(start_time, 'yyyy-MM-dd HH:mm:ss', new Date());
	const parsedEndDate = parse(end_time, 'yyyy-MM-dd HH:mm:ss', new Date());

	// * check if there are any overlapping lectures by other teachers
	let hasOverlapped;
	lectureRows.forEach(async (l) => {
		const overlap = !(isBefore(l.end_time, parsedStartDate) || isAfter(l.start_time, parsedEndDate));
		if (overlap) {
			hasOverlapped = l.subject;
		}
	});

	if(hasOverlapped) {
		res.status(400).json({
			success: false,
			message: 'Lecture overlapped',
			data: {
				overlapped_subject: hasOverlapped
			}
		});
		return;
	} else {
		const { rows } = await query('INSERT INTO lecture_session (teacher_id, branch, sem, div, subject, is_active, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING lecture_id', [teacher_id, branch, sem, div, subject, true, start_time, end_time]);

		const duration = differenceInMinutes(parsedEndDate, parsedStartDate);

		endLectureTimeout(rows[0].lecture_id, duration);

		res.status(201).json({
			success: true,
			message: 'Lecture created',
			data: {
				start_time: start_time,
				end_time: end_time
			}
		})
	}
}

export default createLecture;