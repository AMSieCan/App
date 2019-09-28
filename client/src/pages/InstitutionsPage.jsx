import React, { useEffect, useState } from 'react';
import Environment from '../utils/environment';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { Modal, Table, Button, Form, Input, Grid } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import update from 'immutability-helper';
import { Redirect } from 'react-router-dom';

export default ({ history, match }) => {
  const institutionId = match.params.id;
  const [institutions, setInstitutions] = useState([]);
  const [devices, setDevices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [createDeviceModal, setCreateDeviceModal] = useState(false);
  const [createInstitutionModal, setCreateInstitutionModal] = useState(false);
  const [editInstitutionModal, openEditInstitutionModal] = useState(undefined);
  const [deleteInstitution, deleteInstitutionButton] = useState(undefined);
  const [institutionIndex, setInstitutionIndex] = useState(0);
  const [institutionForm, setInstitutionForm] = useState({
    name: '',
    streetAddress: '',
    city: '',
    state: '',
  });

  const [deviceForm, setDeviceForm] = useState({
    lat: '',
    long: '',
  });

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`${Environment.API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        });
        setUser(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Cookies.remove('accessToken');
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${Environment.API_URL}/institutions`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (res.data) {
        setInstitutions(res.data);
      }
    };
    fetch();
  }, []);

  const onCloseModal = () => {
    setCreateInstitutionModal(false);
    setInstitutionForm({
      name: '',
      streetAddress: '',
      city: '',
      state: ''
      
    });

    setCreateDeviceModal(false);
    setDeviceForm({
      lat: '',
      long: ''
    });


  };

  const onCloseEditModal = () => {
    openEditInstitutionModal(undefined);
    setInstitutionIndex(0);
    setInstitutionForm({
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      lat: null,
      long: null
    });
  };

  const onDeleteInstitution = async (id) => {
     console.log(deleteInstitution)
    const res = await axios.delete(
      `${Environment.API_URL}/institutions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });

    if (res.data) {
      setInstitutions(institutions.filter((institution) => institution._id !== id));
    }
  };



  const onUpdateInstitution = async () => {
    // console.log(editInstitutionModal)
    const res = await axios.put(
      `${Environment.API_URL}/institutions/${editInstitutionModal}`,
      {
        ...institutionForm,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      },
    );

    if (res.data) {
      setInstitutions(
        update(institutions, {
          [institutionIndex]: {
            $set: res.data,
          },
        }),
      );
      onCloseEditModal();
    }
  };

  const onCreateInstitution = async () => {
    const res = await axios.post(
      `${Environment.API_URL}/institutions`,
      {
        ...institutionForm,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      },
    );
    if (res.data) {
      setInstitutions(
        update(institutions, {
          $push: [res.data],
        }),
      );
      onCloseModal();
    }
    try {
      const result = await axios.post(
        `${Environment.API_URL}/institutions/${institutionId}/devices`,
        { ...deviceForm, institutionId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      console.log(devices.lat)
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

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <MainLayout advanced={false}>
      <div className="content">
        <h1>
          {institutions.map((institution) => {
            return institution.name;
          })}
        </h1>

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: '100px' }}>Institution</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '75px' }}>Street Address</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '20px' }}>City</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '20px' }}>State</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '20px' }}>Latitude</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '20px' }}>Longitude</Table.HeaderCell>
              <Table.HeaderCell collapsing>
                <Button onClick={() => setCreateInstitutionModal(true)} primary size="small">
                  Create New
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {institutions.map((institution, index) => (
              <Table.Row
                className="selectable"
                key={institution._id}
                // onClick={() => {
                //   history.push(`/institutions/${institution._id}`);
                // }}
              >
                <Table.Cell>{institution.name}</Table.Cell>
                <Table.Cell>{institution.streetAddress}</Table.Cell>
                <Table.Cell>{institution.city}</Table.Cell>
                <Table.Cell>{institution.state}</Table.Cell>
                <Table.Cell>{devices.lat}</Table.Cell>
                <Table.Cell>{devices.long}</Table.Cell>
                <Table.Cell>
                  <button
                    className="ui blue button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditInstitutionModal(institution._id);
                      setInstitutionForm(institution);
                      setInstitutionIndex(index);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="ui red button"
                    onClick={(e) => {onDeleteInstitution(institution._id);

                      deleteInstitutionButton(institution._id)
                    }}>
                  
                  
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell collapsing></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Modal open={createInstitutionModal} onClose={() => onCloseModal()}>
          <Modal.Header>Create an institution</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid>
                <Grid.Row columns="3">
                  <Grid.Column>
                    <Form.Field>
                      <label>Name</label>
                      <Input
                        value={institutionForm.name}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
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
                      <label>Latitude</label>
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
                      <label>Longitude</label>
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
                <Grid.Row columns="3">
                  <Grid.Column>
                    <Form.Field>
                      <label>Street Address</label>
                      <Input
                        value={institutionForm.streetAddress}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              streetAddress: {
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
                      <label>City</label>
                      <Input
                        value={institutionForm.city}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              city: {
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
                      <label>State</label>
                      <Input
                        value={institutionForm.state}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              state: {
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
            <Button onClick={() => onCreateInstitution()} positive>
              Create
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal open={!!editInstitutionModal} onClose={() => onCloseEditModal()}>
          <Modal.Header>Edit Institution</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid>
                <Grid.Row columns="1">
                  <Grid.Column>
                    <Form.Field>
                      <label>Name</label>
                      <Input
                        className="action input"
                        type="text"
                        // defaultValue={editInstitutionModal.name}
                        defaultValue={institutionForm.name}
                        // placeholder="Rocky"
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              name: {
                                $set: e.target.value,
                              },
                            }),
                          )
                        }
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="3">
                  <Grid.Column>
                    <Form.Field>
                      <label>Street Address</label>
                      <Input
                        defaultValue={institutionForm.streetAddress}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              streetAddress: {
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
                      <label>City</label>
                      <Input
                        defaultValue={institutionForm.city}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              city: {
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
                      <label>State</label>
                      <Input
                        defaultValue={institutionForm.state}
                        onChange={(e) =>
                          setInstitutionForm(
                            update(institutionForm, {
                              state: {
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
            <Button onClick={() => onCloseEditModal()} negative>
              Cancel
            </Button>

            <Button onClick={() => onUpdateInstitution()} positive>
              Update
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </MainLayout>
  );
};
