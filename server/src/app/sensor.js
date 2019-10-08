import { sensorDataModel } from '../model/index';

export const deleteSensor = async (id) => {
  try {
    const deviceData = await sensorDataModel.deleteOne({ _id: id });
    if (deviceData.deletedCount === 0) {
      throw new Error('Failed to delete data point');
    }
  } catch (err) {
    throw err;
  }
};

export const putData = async (description, data, deviceID, recordedAt) => {
  try {
    const deviceData = await sensorDataModel.updateOne(
      { serialNumber: deviceID },
      { description, data, recordedAt },
    );

    return deviceData;
  } catch (err) {
    throw err;
  }
};

export const listSensors = async ({ deviceId }) => {
  try {
    const sensors = await sensorDataModel.find({ deviceId });
    return sensors;
  } catch (err) {
    throw err;
  }
};

export const createSensor = async ({ serialNumber, description, data, deviceId }) => {
  try {
    const sensor = await sensorDataModel.findOne({ serialNumber });
    if (sensor) {
      throw new Error('Sensor is already registered.');
    }

    // Check if that data is in device yet
    const dataSensor = await sensorDataModel.findOne({ deviceId, description });
    if (dataSensor) {
      throw new Error('Sensor description is already registered.');
    }

    const newSensor = await sensorDataModel.create({
      serialNumber,
      description,
      data,
      deviceId,
      recordedAt: new Date(),
    });

    if (newSensor) {
      return newSensor;
    }
  } catch (err) {
    throw err;
  }
};
