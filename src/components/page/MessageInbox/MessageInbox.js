import React, { Fragment } from "react";
import classes from "./MessageInbox.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../Hook/useHttp";
import { Card } from "react-bootstrap";
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
      <Card style={{ marginTop: "20%" }}>
        {error && <h2>{error}</h2>}
        <h1>INBOX</h1>
        <main>
          <h5>{arr ? arr.subject : "loading.."}</h5>
          <p>{arr ? arr.message : "loading.."}</p>
        </main>
        <button onClick={deleteMailHandler}>Delete Mail</button>
      </Card>
    </Fragment>
  );
};

export default MessageInbox;
