import { deviceModel } from '../model/index';

export const addDevice = async ({
  name,
  serialNumber,
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
      return newDevice;
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
