import React, { useEffect, useState } from 'react';
import Environment from '../utils/enviroment';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { Modal, Table, Button, Form, Input, Grid } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import update from 'immutability-helper';

export default ({ history }) => {
  const [institutions, setInstitutions] = useState([]);
  const [createInstitutionModal, setCreateInstitutionModal] = useState(false);
  const [institutionForm, setInstitutionForm] = useState({
    name: '',
    streetAddress: '',
    city: '',
    state: '',
  });

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
      state: '',
    });
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
  };
  return (
    <MainLayout advanced={false}>
      <div className="content">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Institution</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell collapsing>
                <Button onClick={() => setCreateInstitutionModal(true)} primary size="small">
                  Create New
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {institutions.map((institution) => (
              <Table.Row
                className="selectable"
                key={institution._id}
                onClick={() => {
                  history.push(`/institutions/${institution._id}`);
                }}
              >
                <Table.Cell>{institution.name}</Table.Cell>
                <Table.Cell>
                  {institution.streetAddress}, {institution.city}, {institution.state}
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
                <Grid.Row columns="1">
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
      </div>
    </MainLayout>
  );
};
