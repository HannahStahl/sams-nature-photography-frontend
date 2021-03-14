import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  let activeKey = window.location.pathname;
  if (activeKey.includes('photos')) activeKey = '/photos';

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/photos">
        <h4>Sam Johnson</h4>
        <p>Nature Photography</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" activeKey={activeKey}>
          <Nav.Link href="/photos">Photos</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="https://www.instagram.com/samiamphotography/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" />
          </Nav.Link>
          <Nav.Link href="https://www.flickr.com/photos/134786614@N08/albums" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-flickr" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
