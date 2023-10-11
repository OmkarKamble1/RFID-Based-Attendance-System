import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  const { uid, id } = req.query;
  console.log(uid, id);
  res.status(200).json({
	success: true,
	message: "Attendance saved.",
	UID: uid, 
	id: id
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
