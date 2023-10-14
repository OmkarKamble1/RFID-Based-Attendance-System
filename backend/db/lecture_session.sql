CREATE TABLE lecture_session (
	lecture_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	teacher_id uuid NOT NULL,
	sem VARCHAR(100) NOT NULL,
	branch VARCHAR(100) NOT NULL,
	class VARCHAR(10) NOT NULL,
	subject VARCHAR(100) NOT NULL,
	is_active BOOLEAN DEFAULT FALSE,
	start_time TIMESTAMP,
	ende_time TIMESTAMP
);