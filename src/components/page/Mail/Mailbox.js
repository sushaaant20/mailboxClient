import { Fragment, useEffect } from "react";
import classes from "./Mailbox.module.css";
import Inbox from "../Inbox/Inbox";
import { Route, useHistory } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import ComposeMail from "../ComposeMail/ComposeMail";
import Welcome from "../Welcome";
import { useParams } from "react-router-dom";

const Mailbox = () => {
  const history = useHistory();

  const receiveMail = useSelector((state) => state.mailmanager.receive);
  const sentMail = useSelector((state) => state.mailmanager.sent);
  const { id } = useParams();

  let unSeen = receiveMail.length;
  // receiveMail.forEach((data) => {
  //   if (data.seen === true) {
  //     unSeen = unSeen + 1;
  //   }
  //   console.log(receiveMail);
  // });

  return (
    <Fragment>
      <main className={classes.main}>
        <section className={classes.section}>
          <h4 style={{ marginBottom: "40px" }}></h4>
          <Button
            variant="danger"
            style={{ marginBottom: "30px" }}
            onClick={() => {
              history.push("/mailbox/compose");
            }}
          >
            Compose
          </Button>
          <Button
            style={{ marginBottom: "30px" }}
            variant="danger"
            onClick={() => {
              history.push("/mailbox/receiveinbox");
            }}
          >
            Inbox{"  "}
            <Badge bg="light" style={{ color: "black" }}>
              {unSeen}
            </Badge>
          </Button>
          {/* Sent EMAIL */}
          <Button
            variant="danger"
            style={{ marginBottom: "30px" }}
            onClick={() => {
              history.push("/mailbox/inbox");
            }}
          >
            Sent
          </Button>
        </section>
        {/* 
        Route to dynamically render the Inbox based on the emails recieved
        */}

        <Route path="/mailbox/receiveinbox">
          <section
            class="border border-dark"
            style={{
              padding: "20px",
              marginLeft: "50px",
              width: "65%",
            }}
          >
            <h5
              style={{
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              INBOX
            </h5>
            {/* passing props to the mail component which we recieve from the redux state */}
            {receiveMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} type={"receive"} />;
            })}
          </section>
          {/* Route to compose and send email  */}
        </Route>
        <Route path="/mailbox/compose">
          <ComposeMail />
        </Route>
        {/* Route to mailbox/welcome page w */}
        <Route path="/mailbox/welcome">
          <Welcome />
        </Route>
        {/* Route to the inbox where youll find all the emails sent to you */}
        <Route path="/mailbox/inbox">
          <section
            class="border border-dark"
            style={{
              padding: "20px",
              marginLeft: "50px",
              width: "65%",
              borderRadius: "10px",
            }}
          >
            {/* Inside of the sent emails
            Reuse of the Inbox component for both emails recieved and sent
            */}
            <h5
              style={{
                padding: "10px",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              SEND BOX
            </h5>
            {sentMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} type={"sent"} />;
            })}
          </section>
        </Route>
      </main>
    </Fragment>
  );
};

export default Mailbox;
