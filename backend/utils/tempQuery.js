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
INSERT INTO student (first_name,last_name,email,phone,sem,branch,div,id,rfid_uid) VALUES('Pooja', 'Gupta', 'pooja.gupta@example.com', '8765432110', '7', 'IT', 'A', 'vu4f2021284', '1AB1FA2E');
`;

// const q = `SELECT * FROM student WHERE rfid_uid = '833131'`;

try {
	const {rows} = await pool.query(q);
	console.log('rows: ', rows);
} catch (e) {
	console.log('Error: ' + e.message);
}
	
process.exit();