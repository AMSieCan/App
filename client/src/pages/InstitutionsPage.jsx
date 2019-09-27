import React, { useEffect, useState } from 'react';
import Environment from '../utils/environment';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import { Modal, Table, Button, Form, Input, Grid } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import update from 'immutability-helper';
import { Redirect } from 'react-router-dom';


export default ({ history }) => {
  const [institutions, setInstitutions] = useState([]);
  const [createInstitutionModal, setCreateInstitutionModal] = useState(false);
  const [editInstitutionModal, openEditInstitutionModal] = useState(false);
  const [institutionForm, setInstitutionForm] = useState({
    name: '',
    streetAddress: '',
    city: '',
    state: '',
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
      state: '',
    });
  };


 const onCloseEditModal = () => {
   openEditInstitutionModal(false);
    setInstitutionForm({
      name: '',
      streetAddress: '',
      city: '',
      state: '',
    });
  };

  const onUpdateInstitution = async (inst) => {
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

   
    console.log(institutionForm)  
    console.log(inst) 

    
    setInstitutions(inst.map(instInfo =>{
      if(instInfo._id == inst._id) {
        // trying to do something like this
        inst.name = institutionForm.name
        console.log("hello")
      }
    }))
    

    // if (res.data) {
    //   setInstitutions(
    //     update(institutions, {
    //       $push: [res.data],
    //     }),
    //   );
    //   onCloseModal();
    // }
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

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }



  return (
    <MainLayout advanced={false}>
      <div className="content">

      <h1>{

            institutions.map(institution =>{
              return(institution.name)
            })


          }
          


      </h1>






        <Table  striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{width: '100px'}}>Institution</Table.HeaderCell>
              <Table.HeaderCell style={{width: '75px'}}>Street Address</Table.HeaderCell>
              <Table.HeaderCell style={{width: '20px'}}>City</Table.HeaderCell>
              <Table.HeaderCell style={{width: '20px'}}>State</Table.HeaderCell>
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
                // onClick={() => {
                //   history.push(`/institutions/${institution._id}`);
                // }}

              >
                <Table.Cell>{institution.name}</Table.Cell>
                <Table.Cell>
                  {institution.streetAddress}
                </Table.Cell>
                <Table.Cell>
                  {institution.city}
                </Table.Cell>
                <Table.Cell>
                  {institution.state}
                </Table.Cell>
                <Table.Cell>
                  <button className="ui blue button" onClick={(e)=>{e.stopPropagation(); openEditInstitutionModal(institution); console.log(institution.name)}}>Edit</button>
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










        <Modal open={editInstitutionModal} onClose={() => onCloseEditModal()}>
          <Modal.Header>Edit Institution</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid>
                <Grid.Row columns="1">
                  <Grid.Column>
                    <Form.Field>
                      <label>Name</label>
                      <Input className="action input"

                        type="text"
                        // defaultValue={editInstitutionModal.name}
                        defaultValue={editInstitutionModal.name}
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

                        defaultValue={editInstitutionModal.streetAddress}
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
                        defaultValue={editInstitutionModal.city}
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
                        defaultValue={editInstitutionModal.state}
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
            <Button onClick={() => onUpdateInstitution(editInstitutionModal)} positive>
              Create
            </Button>
          </Modal.Actions>
        </Modal>

      </div>
    </MainLayout>
  );
};
