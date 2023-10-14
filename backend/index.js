import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';

import saveAttendance from './controllers/saveAttendance.js';
import teacherLogin from './controllers/teacherLogin.js';
import createLecture from './controllers/createLecture.js';
import cookieParser from 'cookie-parser';
import { loginMiddleware, sessionCheckerMiddleware } from './middlewares/index.js';

dotenv.config();

const app = express();
const port = 3001 || process.env.PORT;
const store = new session.MemoryStore();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	cookie: { maxAge: 1 * 30 * 24 * 60 * 60 * 1000 },
	saveUninitialized: false,
	store: store
}));

// # Save attendance
app.post('/saveAttendance', sessionCheckerMiddleware, saveAttendance);

// # Teacher login
app.get('/teacher/login', loginMiddleware, teacherLogin);

// # Create lecture-session
app.post('/teacher/createLecture', sessionCheckerMiddleware, createLecture);

// # Server running
app.get('/', (_, res) => res.json({success: true, message: 'Server is running.', uptime: process.uptime()}));

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
