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
  Loader,
} from 'semantic-ui-react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import update from 'immutability-helper';
import Environment from '../../utils/environment';

export default ({ history, match }) => {
  const institutionId = match.params.id;
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState('');
  const [institution, setInstitution] = useState({});

  // Get devices and institution data
  useEffect(() => {
    const getInstitutionData = async () => {
      const result = await Axios.get(`${Environment.API_URL}/institutions/${institutionId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      if (result.data) {
        setInstitution(result.data);
        setLoading(false);
      }
    };
    getInstitutionData();
  }, []);

  const onSaveSettings = async () => {
    setSuccess(false);
    setErrorMessage('');
    try {
      const result = await Axios.put(
        `${Environment.API_URL}/institutions/${institutionId}`,
        { ...institution },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
        },
      );
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (loading || !institution) {
    return <Loader />;
  }

  return (
    <div className="content">
      {errorMessage && <Message negative>{errorMessage}</Message>}
      {success && <Message success>Saved!</Message>}
      <Form>
        <Grid>
          <Grid.Row columns="3">
            <Grid.Column>
              <Form.Field>
                <label>Name</label>
                <Input
                  value={institution.name}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
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
                <label>Lat</label>
                <Input
                  value={institution.lat}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
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
                  value={institution.long}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
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
                <label>Street</label>
                <Input
                  value={institution.streetAddress}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
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
                  value={institution.city}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
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
                  value={institution.state}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
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
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Logo URL</label>
                <Input
                  value={institution.logo}
                  onChange={(e) =>
                    setInstitution(
                      update(institution, {
                        logo: {
                          $set: e.target.value,
                        },
                      }),
                    )
                  }
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button onClick={() => onSaveSettings()} primary>
                Save
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};
