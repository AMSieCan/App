import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import Enviroment from '../../utils/enviroment';
import Cookies from 'js-cookie';

export default ({ history }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="pink" textAlign="center">
          Add a device
        </Header>
        <Form
          onSubmit={async () => {
            try {
              setErrorMessage('');
              const result = await axios.post(`${Enviroment.API_URL}/devices`, {
                serialNumber,
                locationDescription,
              });
              Cookies.set('accessToken', result.data);
              return history.push('/');
            } catch (err) {
              if (err.response) {
                setErrorMessage(err.response.data.message);
              }
            }
          }}
          size="large"
        >
          {errorMessage && <Message negative>{errorMessage}</Message>}
          <Segment stacked>
            <Form.Input
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              fluid
              icon="meh outline"
              iconPosition="left"
              placeholder="Serial Number"
            />
            <Form.Input
              value={locationDescription}
              onChange={(e) => setLocationDescription(e.target.value)}
              fluid
              icon="meh"
              iconPosition="left"
              placeholder="Location Description"
            />

            <Button color="pink" fluid size="large">
              Add
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
