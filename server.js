import cors from 'cors';
import express from 'express';

import timelineRouter from './src/modules/timeline/route.js'

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});


app.use('/api/timeline', timelineRouter)

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
