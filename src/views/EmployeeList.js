import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Employee Number</th>
        <th>Name</th>
        <th>Phone</th>
      </tr>
    </thead>
  );
};

const TableContent = (props) => {
  const isEmpty = props.listEmployee.count ? false : true;
  
  if ( isEmpty ) {
    return (
      <tbody>
        <tr>
          <td colSpan={4}>No Results</td>
        </tr>
      </tbody>
    )
  } else {
    return (
      <tbody>
        {props.listEmployee.results.map((data, index) => (
          <tr key={index}>
            <td>{data.employee_number}</td>
            <td>{data.name}</td>
            <td>{data.phone}</td>
          </tr>
        ))}
      </tbody>
    )
  }
}

export default function PelangganList() {
  const employeeService = new EmployeeService();
  
  const listEmployeeInit = {
    count: 0,
    previous: null,
    next: null,
    results: []
  };
  
  const employeeFilterInit = {
    employee_number: '',
    name: '',
    phone: ''
  };

  const [listEmployee, setListEmployee] = useState(listEmployeeInit);
  const [search, setSearch] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState(employeeFilterInit);
  
  const all = () => {
    employeeService.all()
    .then(response => {
      setListEmployee(response.data);
    })
    .catch(error => alert(error));
  };

  const pagination = (url) => {
    employeeService.pagination(url)
    .then(response => {
      setListEmployee(response.data);
    })
    .catch(error => alert(error));
  };

  const searching = () => {
    employeeService.search(search)
    .then(response => {
      setListEmployee(response.data);
    })
    .catch(error => alert(error));
  };

  const filtering = () => {
    employeeService.filter(employeeFilter)
    .then(response => {
      setListEmployee(response.data);
    })
    .catch(error => alert(error));
  }

  const handleInputFilter = e => {
    const { name, value } = e.target;
    setEmployeeFilter({...employeeFilter, [name]: value});
  };

  useEffect(all, []);
    return (
      <>
        <Card>
          <Card.Header>
            <Row>
              <Col md={4}>
                <Form.Row>
                  <Col>
                    <Form.Control onChange={
                      (e) => setSearch(e.target.value)
                    } placeholder="Search" />
                  </Col>
                  <Col>
                    <Button onClick={searching}>Search</Button>
                  </Col>
                </Form.Row>
              </Col>
              <Col md={8} className="d-flex justify-content-end">
                <Form.Row >
                  <Col>
                    <Form.Control 
                      onChange={handleInputFilter} 
                      name="employee_number"
                      placeholder="Employee Number" 
                    />
                  </Col>
                  <Col>
                    <Form.Control 
                      onChange={handleInputFilter}
                      name="name"
                      placeholder="Name" 
                    />
                  </Col>
                  <Col>
                    <Form.Control 
                      onChange={handleInputFilter}
                      name="phone"
                      placeholder="Phone" 
                    />
                  </Col>
                  <Col>
                    <Button onClick={filtering}>Filter</Button>
                  </Col>
                </Form.Row>
              </Col>
            </Row>
          </Card.Header>
          <Table>
            <TableHeader />
            <TableContent listEmployee={listEmployee}  />
          </Table>
          <Card.Footer>
            <div className="btn-group">
              {listEmployee.previous ? (
                <Button onClick={() => pagination(listEmployee.previous)}>
                  Previous
                </Button>
              ):(
                <Button disabled variant="secondary">Previous</Button>
              )}
              {listEmployee.next ? (
                <Button onClick={() => pagination(listEmployee.next)}>
                  Next
                </Button>
              ):(
                <Button disabled variant="secondary">Next</Button>
              )}
            </div>
          </Card.Footer>
        </Card>
      </>
    );
}