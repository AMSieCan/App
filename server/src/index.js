import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';
import { loginUser, createUser, verifyAccessToken, me } from './app/user';
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

app.post('/login', async (req, res) => {
  try {
    // Validate email and password
    const { emailAddress, password } = req.body;
    if (!emailAddress) {
      return res.status(400).send({ message: 'Email address is not valid' });
    }
    if (!password) {
      return res.status(400).send({ message: 'Password is not valid' });
    }

    // Validate user
    const token = await loginUser(emailAddress.toLowerCase(), password);

    res.send(token);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    // Validate email and password
    const { emailAddress, password } = req.body;
    if (!emailAddress) {
      return res.status(400).send({ message: 'Email address is not valid' });
    }
    if (!password) {
      return res.status(400).send({ message: 'Password is not valid' });
    }

    // Validate user
    const token = await createUser(emailAddress.toLowerCase(), password);

    res.send(token);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get('/me', async (req, res) => {
  try {
    // Check header for authorization
    if (req.headers.authorization && req.headers.authorization.includes('Bearer ')) {
      const accessToken = req.headers.authorization.replace('Bearer ', '');
      const userData = await me(accessToken);
      if (userData) {
        return res.send(userData);
      }
    }

    throw new Error('User not found.');
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
