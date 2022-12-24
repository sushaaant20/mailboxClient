import React, { Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../Hook/useHttp";
import { Card, Container, Button } from "react-bootstrap";
import { manageEmailActions } from "../../store/manage-email-reducer";

const MessageInbox = (props) => {
  const mails = useSelector((state) => state.mailmanager.receive);
  const userMail = useSelector((state) => state.auth.MailBoxId);
  console.log(mails);
  const { id } = useParams();

  const [error, sendRequest] = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();

  let arr = mails.find((index) => index.id === id);

  // Delete  Email Function
  const deleteMailHandler = () => {
    const responseHandler = () => {
      dispatch(manageEmailActions.deleteMail(arr.id));
      alert("Message deleted Successfully");
      history.replace("/mailbox/inbox");
    };

    sendRequest(
      {
        request: "delete",
        url: `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/receive${userMail}/${arr.id}.json`,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };
  return (
    <Fragment>
      <Card
        bg="secondary"
        style={{
          marginTop: "3%",
          width: "399px",
          marginLeft: "35%",
          color: "white",
          padding: "20px",
        }}
      >
        {error && <h2>{error}</h2>}
        <Container>
          <span></span>
          <p>Subject = {arr ? arr.subject : "loading.."}</p>
          <p>{arr ? arr.message : "loading.."}</p>
        </Container>
        <Button variant="danger" onClick={deleteMailHandler}>
          Delete Mail
        </Button>
      </Card>
    </Fragment>
  );
};

export default MessageInbox;
