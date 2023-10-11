import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	const { uid } = req.query;
	console.log("GET UID: ", uid);
	res.status(200).send(JSON.stringify({
		success: true,
		message: "Attendance saved.",
		UID: uid
	}));
});

app.post('/', (req, res) => {
	const { uid } = req.body;
	console.log("POST UID: ", uid);
	res.status(200).send(JSON.stringify({
		success: true,
		message: "Attendance saved.",
		UID: uid
	}));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
