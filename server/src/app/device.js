import { deviceModel, sensorDataModel } from '../model/index';

export const addDevice = async ({
  serialNumber,
  name,
  locationDescription,
  lat,
  long,
  institutionId,
}) => {
  try {
    const serial = await deviceModel.findOne({ serialNumber });
    if (serial) {
      throw new Error('Device is already registered.');
    }

    const newDevice = await deviceModel.create({
      name,
      serialNumber,
      locationDescription,
      lat,
      long,
      institutionId,
    });

    if (newDevice) {
      return { ...newDevice.toJSON(), sensorData: { distance: 0, count: 0 } };
    }

    throw new Error('Failed to add device');
  } catch (err) {
    throw err;
  }
};

export const deleteDevice = async (id) => {
  try {
    const device = await deviceModel.deleteOne({ _id: id });

    if (device.deletedCount === 0) {
      throw new Error('Failed to delete device');
    }
  } catch (err) {
    throw err;
  }
};

export const getDevice = async (user, id) => {
  try {
    const device = await deviceModel.findById({ _id: id });

    const sensors = await sensorDataModel.find({ deviceId: id });
    let sensorData = sensors.reduce(
      (prev, curr) => {
        if (curr.description === 'distance') {
          prev.distance += curr.data;
        } else if (curr.description === 'count') {
          prev.count += curr.data;
        }
        return prev;
      },
      { distance: 0, count: 0 },
    );

    return { ...device.toJSON(), sensorData };
  } catch (err) {
    throw err;
  }
};
