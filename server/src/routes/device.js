import { addDevice, deleteDevice, getDevice } from '../app/device';

export default {
  create: async (req, res) => {
    const { name, serialNumber, locationDescription, lat, long, institutionId } = req.body;
    try {
      const device = await addDevice({
        name,
        serialNumber,
        locationDescription,
        lat,
        long,
        institutionId,
      });

      res.status(200).send(device);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  get: async (req, res) => {
    const { id } = req.params;
    try {
      const device = await getDevice(req.user, id);
      res.send(device);
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
      await deleteDevice(id);
      res.status(200).send('200');
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
