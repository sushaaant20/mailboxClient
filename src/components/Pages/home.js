import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { Card } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ComposeMail from "../Mailbox/ComposeMail";
import Sidebar from "./Sidebar";
import Inbox from "../Mailbox/Inbox";
import SentMail from "../Mailbox/SentMail";

function Home() {
  const [compose, setCompose] = useState(false);
  const [inbox, setInbox] = useState(false);
  const [sentmail, setSentMail] = useState(false);

  const showComposeHandler = () => {
    setCompose(!compose);
    setInbox(false);
    setSentMail(false);
  };

  const showInboxHandler = () => {
    setInbox(!inbox);
    setCompose(false);
    setSentMail(false);
  };
  const showSentMailHandler = () => {
    setSentMail(!sentmail);
    setCompose(false);
    setInbox(false);
  };

  const navigate = useNavigate();
  let email = localStorage.getItem("email");
  const logOutHandler = () => {
    console.log("localstorage cleared");
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <Fragment>
      <Navbar bg="dark" style={{ padding: "10px", marginBottom: "10px" }}>
        <Container>
          <Navbar.Brand href="#home" className="text-white">
            MAILBOX CLIENT
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end text-white">
            <Navbar.Text className="text-white">
              Signed in as :{"    "}
              <p>{email}</p>
            </Navbar.Text>
            <Button
              style={{ marginLeft: "20px", marginRight: "-90px" }}
              onClick={logOutHandler}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Sidebar
          showComposeHandler={showComposeHandler}
          showInboxHandler={showInboxHandler}
          showSentMailHandler={showSentMailHandler}
        />
        {compose && <ComposeMail />}
        {inbox && <Inbox />}
        {sentmail && <SentMail />}
      </div>
    </Fragment>
  );
}

export default Home;
