import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';
import user from './routes/user';
import institution from './routes/institution';
import device from './routes/device';
import { serialNumber, locationDescription, addDevice } from './app/device';
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

app.post('/devices', async (req, res) => {
  try {
    // Validate serial number and location
    const { serialNumber, locationDescription } = req.body;
    var serialFormat = /^([0-9a-z]){24}$/i; // alphanumeric, length 24, case insensitive
    if (!serialNumber || !serialNumber.match(serialFormat)) {
      return res.status(400).send({ message: 'Serial number is not valid!' });
    }
    if (!locationDescription) {
      return res.status(400).send({ message: 'You must enter a location description.' });
    }

    // Validate device
    const token = await addDevice(serialNumber.toLowerCase(), locationDescription);

    res.send(token);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Users
app.get('/users/me', user.me);
app.post('/users', user.signUp);
app.post('/users/login', user.login);
app.delete('/users/:id', user.delete);
app.put('/users/:id', user.patch);

// Institution
app.get('/institutions/:id', institution.get);
app.post('/institutions', institution.create);
app.delete('/institutions/:id', institution.delete);
app.put('/institutions/:id', institution.patch);
app.get('/institutions', institution.list);

// Device
app.get('/devices/:id', device.get);
app.post('/devices', device.create);
app.delete('/devices/:id', device.delete);
app.put('/devices/:id', device.patch);
app.get('/devices', device.list);
