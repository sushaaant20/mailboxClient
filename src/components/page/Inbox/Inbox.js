import React from "react";
import classes from "./Inbox.module.css";
import { NavLink } from "react-router-dom";
import useHttp from "../../Hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../../store/manage-email-reducer";

const Inbox = (prop) => {
  const [error, sendRequest] = useHttp();
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const dispatch = useDispatch();

  const removeSeenHandler = () => {
    const dataObj = {
      seen: true,
    };

    const responseHandler = (res) => {
      if (prop.type === "receive") {
        dispatch(manageEmailActions.seenMessage(prop.mails.id));
      } else {
        dispatch(manageEmailActions.seenSentMessageHandler(prop.mails.id));
      }
    };

    sendRequest(
      {
        request: "patch",
        url: `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/receive${userMail}/${prop.mails.id}.json`,
        data: dataObj,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };

  return (
    <React.Fragment>
      <main className={classes.main}>
        <ul>
          <li className={classes.list}>
            <NavLink
              onClick={removeSeenHandler}
              style={{
                backgroundColor:
                  prop.mails.seen === false ? "red" : "lightgreen",
              }}
              to={`/${prop.type}message/${prop.mails.id}`}
            >
              {prop.mails.message}
            </NavLink>
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};
export default Inbox;
