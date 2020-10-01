import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/NavbarComponent';
import EmployeeList from './views/EmployeeList';


function App() {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4 mb-4">
        <EmployeeList />
      </Container>
    </>
  );
}

export default App;
