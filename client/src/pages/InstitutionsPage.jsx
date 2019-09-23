import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Icon, Table, Button } from 'semantic-ui-react';

export default () => {
  return (
    <MainLayout advanced={false}>
      <div className="content">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Institution</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell collapsing>
                <Button primary size="small">
                  Create New
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row onClick={() => {
              console.log('hi')
            }}>
              <Table.Cell>CSUMB</Table.Cell>
              <Table.Cell>144 Townsend St</Table.Cell>
              <Table.Cell collapsing>53 device(s)</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </MainLayout>
  );
};
