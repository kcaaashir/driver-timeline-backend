import express from 'express';
import { postTimeline, getTimeline } from './controller.js'

const app = express();


app.get('/', getTimeline);

app.post('/', postTimeline);

export default app;
