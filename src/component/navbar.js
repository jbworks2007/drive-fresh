import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import home from '../App'

export function Navigation() {
  return (
    <Navbar className='mt-3 bg-mnblue' bg="" variant="dark">
        <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
                <Nav className="me-auto nav-text-color">
                    <Nav.Link style={{color: "white"}} href="/">Home</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="../locate-us">Locate Us</Nav.Link>
                    <Nav.Link style={{color: "white"}} href="../support">Support</Nav.Link>
                </Nav>
        </Container>
    </Navbar>
  )
}
