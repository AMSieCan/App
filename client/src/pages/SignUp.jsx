import React, { useState } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Environment from '../utils/environment';
import Cookies from 'js-cookie';

export default ({ history }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Sign up to your account
        </Header>
        <Form
          onSubmit={async () => {
            try {
              setErrorMessage('');
              const result = await axios.post(`${Environment.API_URL}/users/signup`, {
                emailAddress,
                password,
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
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
