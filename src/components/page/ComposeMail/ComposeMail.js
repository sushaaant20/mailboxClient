import React, { useState, useRef } from "react";
import classes from "./ComposeMail.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useHttp from "../../Hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Container, Form } from "react-bootstrap";
import { manageEmailActions } from "../../store/manage-email-reducer";

const ComposeMail = () => {
  const [message, setMessage] = useState();
  const enteredMailAddRef = useRef();
  const enteredSubjectRef = useRef();

  const [error, sendRequest] = useHttp();

  const userMail = useSelector((state) => state.auth.MailBoxId);

  const refHandler = (event) => {
    setMessage(event.blocks[0].text);
  };

  const dispatch = useDispatch();

  const sendMailHandler = () => {
    const enteredMail = enteredMailAddRef.current.value;
    const enteredSub = enteredSubjectRef.current.value;

    console.log(enteredMail, enteredSub);

    const mail1 = enteredMail.replace("@", "");
    const mail2 = mail1.replace(".", "");

    const dataObj = {
      subject: enteredSub,
      message: message,
      seen: true,
    };

    if (enteredMail.trim().length === 0) {
      alert("Please enter email address");
    } else if (!enteredMail.includes("@") || !enteredMail.includes(".")) {
      alert("Please enter valid email Id");
    } else {
      const resData = () => {
        const responseHandler = (res) => {
          let emailWithId = { ...dataObj, id: res.data.name };
          dispatch(manageEmailActions.setSendMail(emailWithId));
          alert("Email Sent Successfully");
        };

        sendRequest(
          {
            request: "post",
            url: `https://mailclient-25d59-default-rtdb.firebaseio.com/sent${userMail}.json`,
            data: dataObj,
            header: { "Content-type": "application/json" },
          },
          responseHandler
        );
      };

      sendRequest(
        {
          request: "post",
          url: `https://mailclient-25d59-default-rtdb.firebaseio.com/receive${mail2}.json`,
          data: dataObj,
          header: { "Content-type": "application/json" },
        },
        resData
      );
    }
  };

  return (
    <Card
      style={{
        marginLeft: "30vh",
        width: "150vh",
        padding: "10px",
        color: "white",
      }}
      bg="dark"
    >
      <h6>{error}</h6>
      <h6>COMPOSE EMAIL</h6>
      <main className={classes.main}>
        <Container>
          <Form.Control
            ref={enteredMailAddRef}
            type="email"
            id="to"
            placeholder="To"
          />
          <br />
          <Form.Control
            ref={enteredSubjectRef}
            type="text"
            placeholder="subject"
            style={{ marginBottom: "30px" }}
          />
        </Container>

        <form>
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            placeholder="    your message"
            editorStyle={{
              border: "1px solid antiquewhite",
              paddingBottom: "145px",
            }}
            onChange={refHandler}
          />
        </form>
        <Button variant="light" onClick={sendMailHandler}>
          Send
        </Button>
      </main>
    </Card>
  );
};
export default ComposeMail;
