import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const username = sessionStorage.getItem('nom') + ' ' + sessionStorage.getItem('prenom');
  let isLoggedIn = sessionStorage.getItem('username') != null ? true : false;
  const path = window.location.origin;

  let loggedContent = isLoggedIn === true ? 
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto">
    <Link
      to={{ pathname: "/add", state: { fromDashboard: true } }}
      className="nav-link"
    >
      Nouvelle demande
    </Link>
    <Link
      to={{ pathname: "/list", state: { fromDashboard: true } }}
      className="nav-link"
    >
      Liste demandes
    </Link>
  </Nav>
  <Nav>
    <NavDropdown alignRight title={username} id="collasible-nav-dropdown">
      <NavDropdown.Item>
        <Link
          to={{
            pathname: "/logout",
            state: { fromDashboard: true },
          }}
          className="nav-link text-dark"
        >
          <img
            src={path+"/images/logout.png"}
            alt="Logout"
            width="25"
          />
          Se déconnecter
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  </Nav>
</Navbar.Collapse> 
: "";

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <div className="navbar-brand">
        <img src={path+"/images/adria.png"} alt="Logo" width="100" />
      </div>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {loggedContent}
    </Navbar>
  );
}
