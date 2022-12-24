import React, { Fragment } from "react";
import { Button, Container } from "react-bootstrap";

const Sidebar = (props) => {
  return (
    <Fragment>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "10px",
        }}
      >
        <Button onClick={props.showComposeHandler}>Compose</Button>
        <Button onClick={props.showInboxHandler}>Inbox</Button>
        <Button onClick={props.showSentMailHandler}>SentMail</Button>
      </Container>
    </Fragment>
  );
};

export default Sidebar;
