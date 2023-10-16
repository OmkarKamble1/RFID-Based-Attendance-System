CREATE TABLE attendance (
	id SERIAL PRIMARY KEY,
	student_id uuid NOT NULL,
	teacher_id uuid NOT NULL,
	lecture_id uuid NOT NULL,
	attended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);