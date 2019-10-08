import { deleteSensor, createSensor } from '../app/sensor';

export default {
  create: async (req, res) => {
    const { description, data, deviceId, serialNumber } = req.body;
    try {
      if (!description) {
        throw new Error('Missing description');
      }
      if (!serialNumber) {
        throw new Error('Missing serialNumber');
      }
      if (!deviceId) {
        throw new Error('Missing deviceId');
      }
      const sensor = await createSensor({
        description,
        data,
        deviceId,
        serialNumber,
        recordedAt: new Date(),
      });
      // Success adding device data
      res.status(200).send(sensor);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  get: async (req, res) => {
    try {
      res.send('200');
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
      await deleteSensor(id);
      res.status(200).send('200');
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
