import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Message,
  Table,
  Modal,
  Input,
  Select,
} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import update from 'immutability-helper';
import Environment from '../../utils/environment';

export default ({ history, match }) => {
  const deviceId = match.params.deviceId;
  const [device, setDevice] = useState({});
  const [sensors, setSensors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [createSensorModal, setCreateSensorModal] = useState(false);
  const [sensorForm, setSensorForm] = useState({
    description: '',
    serialNumber: '',
    data: 0,
  });

  const onCloseModal = () => {
    setCreateSensorModal(false);
    setSensorForm({
      description: '',
      serialNumber: '',
      data: 0,
    });
  };

  const onDeleteSensor = async (id) => {
    try {
      await Axios.delete(`${Environment.API_URL}/sensors/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      setSensors(sensors.filter((d) => d._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const onCreateSensor = async () => {
    try {
      const result = await Axios.post(
        `${Environment.API_URL}/sensors`,
        { ...sensorForm, deviceId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      onCloseModal();
      setSensors(
        update(sensors, {
          $push: [result.data],
        }),
      );
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  // Get device
  useEffect(() => {
    const getDevice = async () => {
      const result = await Axios.get(`${Environment.API_URL}/devices/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (result.data) {
        setDevice(result.data);
      }
    };
    // get sensors
    const getSensors = async () => {
      const result = await Axios.get(`${Environment.API_URL}/devices/${deviceId}/sensors`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (result.data) {
        setSensors(result.data);
      }
    };
    getDevice();
    getSensors();
  }, []);

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Sensors for device {device.name}</h1>
        <Button onClick={() => setCreateSensorModal(true)} primary size="small">
          Create New
        </Button>
      </div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Serial</Table.HeaderCell>
            <Table.HeaderCell>Data</Table.HeaderCell>
            <Table.HeaderCell>Recorded At</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sensors.map((sensor) => (
            <Table.Row key={sensor._id}>
              <Table.Cell>{sensor.description}</Table.Cell>
              <Table.Cell>{sensor.serialNumber}</Table.Cell>
              <Table.Cell>{sensor.data}</Table.Cell>
              <Table.Cell>{sensor.recordedAt}</Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  color="red"
                  icon="trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSensor(sensor._id);
                  }}
                ></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal open={createSensorModal} onClose={() => onCloseModal()}>
        <Modal.Header>Add a sensor</Modal.Header>
        <Modal.Content>
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Form>
            <Grid>
              <Grid.Row columns="3">
                <Grid.Column>
                  <Form.Field>
                    <label>Description</label>
                    <Select
                      options={[
                        { key: 'distance', text: 'Distance', value: 'distance' },
                        { key: 'count', text: 'Count', value: 'count' },
                      ]}
                      value={sensorForm.description}
                      defaultValue="distance"
                      onChange={(e, data) =>
                        setSensorForm(
                          update(sensorForm, {
                            description: {
                              $set: data.value,
                            },
                          }),
                        )
                      }
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label>Serial Number</label>
                    <Input
                      value={sensorForm.serialNumber}
                      onChange={(e) =>
                        setSensorForm(
                          update(sensorForm, {
                            serialNumber: {
                              $set: e.target.value,
                            },
                          }),
                        )
                      }
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label>Data</label>
                    <Input
                      value={sensorForm.data}
                      onChange={(e) =>
                        setSensorForm(
                          update(sensorForm, {
                            data: {
                              $set: e.target.value,
                            },
                          }),
                        )
                      }
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => onCloseModal()} negative>
            Cancel
          </Button>
          <Button onClick={() => onCreateSensor()} positive>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
