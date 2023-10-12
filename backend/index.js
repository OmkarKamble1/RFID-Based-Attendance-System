import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';

import saveAttendance from './controllers/saveAttendance.js';
import teacherLogin from './controllers/teacherLogin.js';

dotenv.config();

const app = express();
const port = 3001 || process.env.PORT;
const store = new session.MemoryStore();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	cookie: { maxAge: 1 * 30 * 24 * 60 * 60 * 1000 },
	saveUninitialized: false,
	store: store
}));


// # Save attendance route
app.post('/markAttendance', saveAttendance);

// # Teacher login route
app.post('/teacher/login', teacherLogin);


// # Server running route
app.get('/', (_, res) => res.status(200).send('Server is running.'));

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
