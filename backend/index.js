import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';

import saveAttendance from './controllers/saveAttendance.js';
import teacherLogin from './controllers/teacherLogin.js';
import createLecture from './controllers/createLecture.js';
import cookieParser from 'cookie-parser';
import { loginMiddleware, hardwareMiddleware, sessionCheckerMiddleware } from './middlewares/index.js';
import lectureReport from './controllers/lectureReport.js';
import lectureStatus from './controllers/lectureStatus.js';
import { format } from 'date-fns';

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
	cookie: { 
		maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
		secure: true
	},
	saveUninitialized: false,
	store: store,
	resave: false
}));

// # Save attendance
app.post('/saveAttendance', hardwareMiddleware, saveAttendance);

// # Teacher login
app.post('/teacher/login', loginMiddleware, teacherLogin);

// # Create lecture-session
app.post('/teacher/lecture/create', sessionCheckerMiddleware, createLecture);

// # Lecture report
app.post('/teacher/lecture/report', sessionCheckerMiddleware, lectureReport);

// # Lecture status
app.post('/teacher/lecture/status', sessionCheckerMiddleware, lectureStatus);

// # Test route
app.post('/test', hardwareMiddleware, async (req, res) => {
	const { uid } = req.body;
	const formattedDate = format(new Date(Date.now()), 'dd-MM-yyyy HH:mm:ss');
	console.log(`[${formattedDate}][test]: recieved request for UID: ${uid}`);
	res.status(200).send(`[${formattedDate}][test]: recieved request for UID: ${uid}`);
});

// # Server running
app.get('/', (_, res) => res.json({success: true, message: 'Server is running.', uptime: process.uptime()}));

app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
