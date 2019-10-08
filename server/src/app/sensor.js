import { deviceModel } from '../model';

export const putData = async ({ // Device data is recorded into the model here
  description,
  data,
  deviceID,
  recordedAt,
}) => {
  try {
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

export const lastData = async (deviceID) => {
  try {
    // Check for and return last data
    const dataTable = await sensorDataModel.find({
      deviceID: deviceID,
    });

    if (!dataTable) { // Check to make sure there is data
      throw new Error ('No data found');
    }
    return dataTable;

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
