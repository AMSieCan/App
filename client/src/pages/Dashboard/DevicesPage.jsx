import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Grid,
  Message,
  Table,
  Modal,
  Input,
  TextArea,
} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import update from 'immutability-helper';
import Environment from '../../utils/environment';

export default ({ history, match }) => {
  const institutionId = match.params.id;
  const [devices, setDevices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [createDeviceModal, setCreateDeviceModal] = useState(false);
  const [deviceForm, setDeviceForm] = useState({
    name: '',
    serialNumber: '',
    locationDescription: '',
    lat: '',
    long: '',
  });

  const onCloseModal = () => {
    setCreateDeviceModal(false);
    setDeviceForm({
      name: '',
      serialNumber: '',
      locationDescription: '',
      lat: '',
      long: '',
    });
  };

  const onDeleteDevice = async (id) => {
    try {
      await Axios.delete(`${Environment.API_URL}/devices/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      setDevices(devices.filter((d) => d._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const onCreateDevice = async () => {
    try {
      const result = await Axios.post(
        `${Environment.API_URL}/devices`,
        { ...deviceForm, institutionId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      onCloseModal();
      setDevices(
        update(devices, {
          $push: [result.data],
        }),
      );
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  // Get devices
  useEffect(() => {
    const getDevices = async () => {
      const result = await Axios.get(
        `${Environment.API_URL}/institutions/${institutionId}/devices`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      if (result.data) {
        setDevices(result.data);
      }
    };
    getDevices();
  }, []);

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Device(s)</h1>
        <Button onClick={() => setCreateDeviceModal(true)} primary size="small">
          Create New
        </Button>
      </div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Device</Table.HeaderCell>
            <Table.HeaderCell>Serial</Table.HeaderCell>
            <Table.HeaderCell>Lat/Long</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Distance</Table.HeaderCell>
            <Table.HeaderCell>Count</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {devices.map((device) => (
            <Table.Row
              className="selectable"
              key={device._id}
              onClick={() => {
                history.push(`/institutions/${institutionId}/devices/${device._id}`);
              }}
            >
              <Table.Cell>{device.name}</Table.Cell>
              <Table.Cell>{device.serialNumber}</Table.Cell>
              <Table.Cell>
                {device.lat}/{device.long}
              </Table.Cell>
              <Table.Cell>{device.locationDescription}</Table.Cell>
              <Table.Cell>{device.sensorData.distance}</Table.Cell>
              <Table.Cell>{device.sensorData.count}</Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  color="red"
                  icon="trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDevice(device._id);
                  }}
                ></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal open={createDeviceModal} onClose={() => onCloseModal()}>
        <Modal.Header>Create a device</Modal.Header>
        <Modal.Content>
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Form>
            <Grid>
              <Grid.Row columns="2">
                <Grid.Column>
                  <Form.Field>
                    <label>Name</label>
                    <Input
                      value={deviceForm.name}
                      onChange={(e) =>
                        setDeviceForm(
                          update(deviceForm, {
                            name: {
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
                    <label>Serial Number</label>
                    <Input
                      value={deviceForm.serialNumber}
                      onChange={(e) =>
                        setDeviceForm(
                          update(deviceForm, {
                            serialNumber: {
                              $set: e.target.value,
                            },
                          }),
                        )
                      }
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns="2">
                <Grid.Column>
                  <Form.Field>
                    <label>Lat</label>
                    <Input
                      value={deviceForm.lat}
                      onChange={(e) =>
                        setDeviceForm(
                          update(deviceForm, {
                            lat: {
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
                    <label>Long</label>
                    <Input
                      value={deviceForm.long}
                      onChange={(e) =>
                        setDeviceForm(
                          update(deviceForm, {
                            long: {
                              $set: e.target.value,
                            },
                          }),
                        )
                      }
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="1">
                <Grid.Column>
                  <Form.Field>
                    <label>Description</label>
                    <TextArea
                      rows={4}
                      value={deviceForm.locationDescription}
                      onChange={(e) =>
                        setDeviceForm(
                          update(deviceForm, {
                            locationDescription: {
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
          <Button onClick={() => onCreateDevice()} positive>
            Create
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
