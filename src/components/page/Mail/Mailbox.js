import { Fragment } from "react";
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
  const { id } = useParams();
  let unSeen = 0;
  receiveMail.forEach((data) => {
    if (data.seen == false) {
      unSeen = unSeen + 1;
    }
  });

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
              history.push("/mailbox/inbox");
            }}
          >
            Inbox
            <Badge bg="light" style={{ color: "black" }}>
              {unSeen}
            </Badge>
          </Button>
          <Button variant="danger" style={{ marginBottom: "30px" }}>
            Sent
          </Button>
        </section>
        <Route path="/mailbox/inbox">
          <section className={classes.inbox_main}>
            {receiveMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} />;
            })}
          </section>
        </Route>
        <Route path="/mailbox/compose">
          <ComposeMail />
        </Route>
        <Route path="/mailbox/welcome">
          <Welcome />
        </Route>
      </main>
    </Fragment>
  );
};

export default Mailbox;
