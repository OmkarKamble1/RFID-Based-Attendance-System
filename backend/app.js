import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  const name = req.query.name;
  res.status(200).json({
	query: req.query
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
