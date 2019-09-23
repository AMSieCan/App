import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';
import user from './routes/user';
import institution from './routes/institution';
import device from './routes/device';
import { serialNumber, locationDescription, addDevice } from './app/device';
import { me } from './app/user';
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

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.includes('Bearer ')) {
      const accessToken = req.headers.authorization.replace('Bearer ', '');
      const userData = await me(accessToken);
      if (userData) {
        req.user = userData;
        return next();
      }
    }
    return res.status(500).send({ message: 'Unauthenticated' });
  } catch (err) {
    return res.status(500).send({ message: 'Unauthenticated' });
  }
};

// Users
app.get('/users/me', isAuthenticated, user.me);
app.post('/users', user.signUp);
app.post('/users/login', user.login);
app.delete('/users/:id', isAuthenticated, user.delete);
app.put('/users/:id', isAuthenticated, user.patch);

// Institution
app.get('/institutions/:id', isAuthenticated, institution.get);
app.post('/institutions', isAuthenticated, institution.create);
app.delete('/institutions/:id', isAuthenticated, institution.delete);
app.put('/institutions/:id', isAuthenticated, institution.patch);
app.get('/institutions', isAuthenticated, institution.list);

// Institute users
app.post('/institutions/:id/users', isAuthenticated, institution.addUser);
app.get('/institutions/:id/users', isAuthenticated, institution.listUser);
app.delete('/institutions/:id/users/:institutionUserId', isAuthenticated, institution.deleteUser);

// Device
app.get('/devices/:id', isAuthenticated, device.get);
app.post('/devices', isAuthenticated, device.create);
app.delete('/devices/:id', isAuthenticated, device.delete);
app.put('/devices/:id', isAuthenticated, device.patch);
app.get('/devices', isAuthenticated, device.list);
