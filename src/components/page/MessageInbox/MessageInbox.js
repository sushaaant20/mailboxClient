import React, { Fragment } from "react";
import classes from "./MessageInbox.module.css";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../Hook/useHttp";
import { manageEmailActions } from "../../store/manage-email-reducer";

const MessageInbox = () => {
  const mails = useSelector((state) => state.mailmanager.receive);
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const { id } = useParams();
  const [error, sendRequest] = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(mails, "==>MESSAGE");
  let arr = mails.find((index) => index.id === id);

  const deleteMailHandler = () => {
    const responseHandler = () => {
      dispatch(manageEmailActions.deleteMail(arr.id));
      alert("Message deleted Successfully");
      history.replace("/mailbox/receiveinbox");
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
      {error && <h2>{error}</h2>}
      <h1 className={classes.heading}>INBOX</h1>
      <main className={classes.main}>
        <h5>{arr ? arr.subject : "loading.."}</h5>
        <p>{arr ? arr.message : "loading.."}</p>
      </main>
      <button className={classes.delete_button} onClick={deleteMailHandler}>
        Delete Mail
      </button>
    </Fragment>
  );
};

export default MessageInbox;
