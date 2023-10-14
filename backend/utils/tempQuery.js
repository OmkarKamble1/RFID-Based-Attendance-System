// # Connecting to db
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	max: 10
});

const q = `
CREATE TABLE lecture_session (
	lecture_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	teacher_id uuid NOT NULL,
	sem VARCHAR(100) NOT NULL,
	branch VARCHAR(100) NOT NULL,
	div VARCHAR(10) NOT NULL,
	subject VARCHAR(100) NOT NULL,
	is_active BOOLEAN NOT NULL,
	start_time TIMESTAMP,
	end_time TIMESTAMP
);
`;

try {
	const {rows} = await pool.query(q);
	console.log('rows: ', rows);
} catch (e) {
	console.log('Error: ' + e.message);
}
	
process.exit();