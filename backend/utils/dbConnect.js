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

await pool.connect();

export const query = async (q, params) => {
	const { rows, rowCount } = await pool.query(q, params);
  	return { rows, rowCount };
};


// # to connect localhost
// import * as pg from 'pg';

// const { Pool } = pg.default;

// if (!global.db) {
// 	global.db = { pool: null };
// }

// export const query = async (q, params) => {
// 	if (!global.db.pool) {
// 		global.db.pool = await new Pool({
// 			user: 'postgres',
// 			host: 'localhost',
// 			database: 'rfid-attendance',
// 			password: 'root',
// 			port: 5432,
// 			max: 1
// 		});

// 		global.db.pool.on('error', (err) => {
// 			throw Error('Postgres connection error: ' + err);
// 		});
// 	}

// 	const { rows, rowCount } = await global.db.pool.query(q, params);

// 	return { rows, rowCount };
// };

// # to connect cloud db
// import { Client } from 'pg';

// const client = new Client({ connectionString: process.env.DBURL });

// (async () => {
// 	try {
// 		await client.connect();
// 	} catch (err) {
// 		console.log(err.message);
// 	}
// })();

// export const query = async (q, params) => {
// 	try {
// 		const { rows, rowCount } = await client.query(q, params);
// 		return { rows, rowCount };
// 	} catch (error) {
// 		throw error;
// 	}
// };
