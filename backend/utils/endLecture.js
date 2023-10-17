import { query } from './dbConnect.js';
import { devConsole } from './miscellaneous.js';

export const endLectureTimeout = (lecture_id, deletion_time) => {
	setTimeout(async () => {
		await query('UPDATE lecture_session SET is_active = $1 WHERE lecture_id = $2', [false, lecture_id]);
	}, deletion_time * 60 * 1000);
	devConsole(`${lecture_id} -> ${deletion_time} mins`)
}
