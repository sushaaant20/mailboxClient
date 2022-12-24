import React from "react";
import { Button, Container, Navbar, NavbarBrand } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const bannerFunction = () => {
    history.replace("/mailbox/welcome");
  };
  const logoutFunction = () => {
    localStorage.clear();
    history.replace("/");
  };
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" style={{ marginBottom: "10px" }}>
        <Container>
          <Navbar.Brand onClick={bannerFunction} style={{ cursor: "pointer" }}>
            MAIL BOX CLIENT
          </Navbar.Brand>
        </Container>
        <Container>
          <Button
            variant="danger"
            style={{ marginLeft: "auto" }}
            onClick={logoutFunction}
          >
            LogOut
          </Button>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
export default Header;
