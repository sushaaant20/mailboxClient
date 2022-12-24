import React from "react";
import { Button, Container, Navbar, NavbarBrand } from "react-bootstrap";
const Header = () => {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" style={{ marginBottom: "10px" }}>
        <Container>
          <Navbar.Brand>MAIL BOX CLIENT</Navbar.Brand>
        </Container>
        <Container>
          <Button variant="danger" style={{ marginLeft: "auto" }}>
            LogOut
          </Button>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
export default Header;
