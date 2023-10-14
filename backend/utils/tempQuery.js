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
SELECT * FROM teacher;
`;

try {
	const {rows} = await pool.query(q);
	console.log('rows: ', rows);
} catch (e) {
	console.log('Error: ' + e.message);
}
	
process.exit();