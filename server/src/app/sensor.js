import { sensorDataModel } from '../model/index';
import { deviceModel } from '../model/index';

export const putData = async ({ description, data, deviceId, recordedAt, serialNumber }) => {
  try {
    // Todo: Verify device exists before creating a record
    var serialNumber = deviceID;
    const serial = await deviceModel.findOne({ serialNumber });
    if (!serial) {
      //  throw new Error('Device is already registered.');
      throw new Error(
        'Device not found in list!  See Admin to add the device first before sending data',
      );
    }
    const newData = await deviceModel.create({
      description,
      data,
      deviceID,
      recordedAt,
    });

    if (newData) {
      return newData;
    }

    throw new Error('Failed to add data point');
  } catch (err) {
    throw err;
  }
};

export const deleteData = async (id) => {
  try {
    const deviceData = await deviceModel.deleteOne({ _id: id });

    if (deviceData.deletedCount === 0) {
      throw new Error('Failed to delete data point');
    }
  } catch (err) {
    throw err;
  }
};
