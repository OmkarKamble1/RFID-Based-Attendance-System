CREATE TABLE attendance (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	student_id uuid NOT NULL,
	teacher_id uuid NOT NULL,
	lecture_id uuid NOT NULL,
	attended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);