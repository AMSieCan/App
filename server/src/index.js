import request from 'request';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';
const app = express();
db();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
const server = http.createServer(app);

server.listen({ port: 8000 }, () => {
  console.log(`Server ready at 8000`);
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/webhook', (req, res) => {
  console.log(req.body);
  res.send('OK');
});
