import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../logo.svg';

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{' '}
        React Express PSF
      </Navbar.Brand>
    </Navbar>
  );
}