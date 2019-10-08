import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';
import user from './routes/user';
import institution from './routes/institution';
import device from './routes/device';
import sensor from './routes/sensor';
import { me } from './app/user';
import { putData } from './app/sensor';
const app = express();
db();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
const server = http.createServer(app);

server.listen({ port: 8000 }, () => {
  console.log(`Server ready at 8000`);
});  

//app.get('/', (req, res) => {
  //res.send('hello world');
//});

app.post('/sensor', async (req, res) => {
  console.log("Received post request with "+Object.keys(req.body).length+" members included in the body..");

  try {
    // Parse body of the post request for explicit tags which are provided by particle.io api
    const description = req.body.event; //data type
    const data = req.body.data; // data value
    const deviceID = req.body.coreid; // serial number of device
    const recordedAt = req.body.published_at; // date published
    const response = await putData(description, data, deviceID, recordedAt);
    res.send(response);
    console.log("Added data point");
  } catch (err) {
    res.status(500).send( { message: err.message } );
  }
});

//app.post('/devices', async (req, res) => {
  //console.log(req.body);
  //res.send('OK');

  //   try {
//     // Validate serial number and location
//     const { serialNumber, locationDescription } = req.body;
//     var serialFormat = /^([0-9a-z]){24}$/i; // alphanumeric, length 24, case insensitive
//     if (!serialNumber || !serialNumber.match(serialFormat)) {
//       return res.status(400).send({ message: 'Serial number is not valid!' });
//     }
//     if (!locationDescription) {
//       return res.status(400).send({ message: 'You must enter a location description.' });
//     }

//     // Validate device
//     const token = await addDevice(serialNumber.toLowerCase(), locationDescription);

//     res.send(token);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
//});

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

// Institution users
app.post('/institutions/:id/users', isAuthenticated, institution.addUser);
app.get('/institutions/:id/users', isAuthenticated, institution.listUser);
app.delete('/institutions/:id/users/:institutionUserId', isAuthenticated, institution.deleteUser);

// Institution devices
app.get('/institutions/:id/devices', isAuthenticated, institution.listDevice);

// Device
app.get('/devices/:id', isAuthenticated, device.get);
app.post('/devices', isAuthenticated, device.create);
app.delete('/devices/:id', isAuthenticated, device.delete);
app.put('/devices/:id', isAuthenticated, device.patch);
app.get('/devices/:id/sensors', isAuthenticated, device.getSensors);

// Sensors and data
app.post('/sensors', sensor.create);
app.put('/sensors/:id', sensor.patch);
app.get('/sensors/:id', sensor.get);
app.delete('/sensors/:id', sensor.delete);
