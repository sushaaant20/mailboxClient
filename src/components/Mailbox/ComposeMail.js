import React, { useRef, Fragment } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmailBody from "./EmailBody";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import Editor from "./Editor";
import { Button, Card, Container, Form } from "react-bootstrap";

const ComposeMail = () => {
  const navigate = useNavigate();
  const loginEmail = useSelector((state) => state.auth.loginEmail);
  console.log("loggedinEmail:", loginEmail);

  const enteredToInputRef = useRef();
  const enteredSubjectInputRef = useRef();
  let bodyText;

  const onEditorStateChange = (event) => {
    bodyText = event.getCurrentContent().getPlainText();
  };

  const onSendClickHandler = async () => {
    const enteredTo = enteredToInputRef.current.value;
    const enteredSubject = enteredSubjectInputRef.current.value;

    const inboxMailDataObj = {
      from: loginEmail,
      subject: enteredSubject,
      body: bodyText,
      read: false,
    };
    const sentMailDataObj = {
      to: enteredTo,
      subject: enteredSubject,
      body: bodyText,
    };
    //This regular expression replaces all starting and trailing non alphanumeric characters from the string.

    const toFormattedEmail = enteredTo.replace(/[^a-zA-Z0-9]/g, "");

    try {
      const response = await axios.post(
        `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/${toFormattedEmail}/Inbox.json`,
        inboxMailDataObj
      );

      console.log(response);

      const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");

      const sentResponse = await axios.post(
        `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedLoggedInEmail}/SentMail.json`,
        sentMailDataObj
      );

      console.log(sentResponse);
    } catch (err) {
      console.log(err);
    }
    enteredToInputRef.current.value = null;
    enteredSubjectInputRef.current.value = null;
    alert("Email-Sent Successfully!!");

    // navigate("/mail-page");
  };
  return (
    <Fragment>
      <Card
        style={{
          marginLeft: "30%",
          height: "450px",
          width: "600px",
          padding: "10px",
        }}
      >
        <Container>
          <Form>
            <Form.Group style={{ width: "400px" }}>
              <Form.Control
                placeholder="TO"
                ref={enteredToInputRef}
              ></Form.Control>
              <br />
              {/* //<Form.Control placeholder="From"></Form.Control> */}
              <Form.Control
                placeholder="Subject"
                ref={enteredSubjectInputRef}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group style={{ height: "220px" }}>
              {/* <Form.Control style={{ height: "220px" }}></Form.Control> */}
              <EmailBody onEditorStateChange={onEditorStateChange} />
            </Form.Group>
            <br />
            <Form.Group style={{ marginLeft: "500px", marginTop: "-18px" }}>
              <Button variant="dark" onClick={onSendClickHandler}>
                Send
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </Card>
    </Fragment>
  );
};

export default ComposeMail;
