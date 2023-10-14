export const endLectureTimeout = (lecture_id, deletion_time) => {
	setTimeout(async () => {
		await query('UPDATE lecture_session SET is_active = $1 WHERE lecture_id = $2', [false, lecture_id]);
		console.log('deleted ', rows[0].first_name)
	}, deletion_time * 60 * 1000);
	console.log(`${lecture_id} will be deleted`)
}
