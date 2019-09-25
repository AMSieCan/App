import React from "react"
import { Modal, Table, Button, Form, Input, Grid } from 'semantic-ui-react';

class EditInstitution extends React.Component {
	render() {
		return (

			<div>
			<button>Edit</button>
			{console.log('hello')}
				




<Modal >
          <Modal.Header>Create an institution</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid>
                <Grid.Row columns="1">
                  <Grid.Column>
                    <Form.Field>
                      <label>Name</label>
                      <Input
                        // value={institutionForm.name}
                        // onChange={(e) =>
                        //   setInstitutionForm(
                        //     update(institutionForm, {
                        //       name: {
                        //         $set: e.target.value,
                        //       },
                        //     }),
                        //   )
                        // }
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>                 
              </Grid>
            </Form>
          </Modal.Content>
        
        </Modal>



















				</div>



						
		)
	}
}
export default EditInstitution