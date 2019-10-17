import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Message, Table, Modal, Input, Select } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import update from 'immutability-helper';
import Environment from '../../utils/environment';

export default ({ history, match }) => {
  const institutionId = match.params.id;
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [createUserModal, setCreateUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    emailAddress: '',
    role: 'USER',
  });

  const [editUserForm, setEditUserForm] = useState({
    _id: '',
    role: '',
    emailAddress: '',
    index: 0,
  });

  const onCloseModal = () => {
    setEditUserModal(false);
    setCreateUserModal(false);
    setUserForm({
      emailAddress: '',
      role: 'USER',
    });
    setEditUserForm({
      index: 0,
      _id: '',
      role: '',
      emailAddress: '',
    });
  };

  const onDeleteUser = async (id) => {
    try {
      await Axios.delete(`${Environment.API_URL}/institutions/${institutionId}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const onCreateUser = async () => {
    try {
      const result = await Axios.post(
        `${Environment.API_URL}/institutions/${institutionId}/users`,
        { ...userForm, institutionId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      onCloseModal();
      setUsers(
        update(users, {
          $push: [result.data],
        }),
      );
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const onPatchUser = async () => {
    try {
      const newRole = await Axios.patch(
        `${Environment.API_URL}/institutions/${institutionId}/users/${editUserForm._id}`,
        {
          role: editUserForm.role,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      setUsers(
        update(users, {
          [editUserForm.index]: {
            $set: newRole.data,
          },
        }),
      );
      onCloseModal();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Get users
  useEffect(() => {
    const getUsers = async () => {
      const result = await Axios.get(`${Environment.API_URL}/institutions/${institutionId}/users`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (result.data) {
        setUsers(result.data);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Users</h1>
        <Button onClick={() => setCreateUserModal(true)} primary size="small">
          Add User
        </Button>
      </div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Switch Role</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={user._id}>
              <Table.Cell>{user.emailAddress}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  color="orange"
                  icon="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditUserModal(true);
                    setEditUserForm({
                      _id: user._id,
                      role: user.role,
                      emailAddress: user.emailAddress,
                      index,
                    });
                  }}
                ></Button>
              </Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  color="red"
                  icon="trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(user._id);
                  }}
                ></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal open={createUserModal} onClose={() => onCloseModal()}>
        <Modal.Header>Add a user</Modal.Header>
        <Modal.Content>
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Form>
            <Grid>
              <Grid.Row columns="2">
                <Grid.Column>
                  <Form.Field>
                    <label>User</label>
                    <Input
                      value={userForm.emailAddress}
                      onChange={(e) =>
                        setUserForm(
                          update(userForm, {
                            emailAddress: {
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
                    <label>Role</label>
                    <Select
                      options={[
                        { key: 'USER', text: 'USER', value: 'USER' },
                        { key: 'ADMIN', text: 'ADMIN', value: 'ADMIN' },
                      ]}
                      value={userForm.role}
                      defaultValue="USER"
                      onChange={(e, data) =>
                        setUserForm(
                          update(userForm, {
                            role: {
                              $set: data.value,
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
          <Button onClick={() => onCreateUser()} positive>
            Add
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={editUserModal} onClose={() => onCloseModal()}>
        <Modal.Header>Edit user</Modal.Header>
        <Modal.Content>
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Form>
            <Grid>
              <Grid.Row columns="2">
                <Grid.Column>
                  <Form.Field>
                    <label>User</label>
                    <Input value={editUserForm.emailAddress} readOnly />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label>Role</label>
                    <Select
                      options={[
                        { key: 'USER', text: 'USER', value: 'USER' },
                        { key: 'ADMIN', text: 'ADMIN', value: 'ADMIN' },
                      ]}
                      value={editUserForm.role}
                      defaultValue="USER"
                      onChange={(e, data) =>
                        setEditUserForm(
                          update(editUserForm, {
                            role: {
                              $set: data.value,
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
          <Button onClick={() => onPatchUser()} positive>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
