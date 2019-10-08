import { 
  putData,
  lastData,
  deleteData,
} from '../app/sensor';

export default {
  create: async (req, res) => {
    const { description, data, deviceID, recordedAt } = req.body;
    try {
      const deviceData = await putData({
        description,
        data,
        deviceID,
        recordedAt,
      });
      // Success adding device data
      res.status(200).send(deviceData);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  get: async (req, res) => {
    try {
      const { sensorRequested } = req.params;
      const sensorData = await lastData(sensorRequested);
      res.send(sensorData);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  patch: async (req, res) => {
    try {
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  list: async (req, res) => {
    try {
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await deleteData(id);
      res.status(200).send('200');
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
