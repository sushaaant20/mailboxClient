import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { inboxActions } from "../../store/inboxSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const InboxDetails = (props) => {
  //console.log(`inside inboxdetailed`);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emails = useSelector((state) => state.inbox.emails);
  const loginEmail = useSelector((state) => state.auth.loginEmail);

  const emailDetailKey = props.emailDetails.emailDetail;

  dispatch(inboxActions.onEmailRead(emailDetailKey));

  //console.log(emails[emailDetailKey]);

  useEffect(() => {
    const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");
    //console.log(formattedLoggedInEmail)
    const emailRead = async () => {
      try {
        const response = await axios.put(
          `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedLoggedInEmail}/Inbox/${emailDetailKey}.json`,
          emails[emailDetailKey]
        );
        console.log(emails[emailDetailKey]);
        console.log(response);
      } catch (err) {
        console.log(`error occurred`, err);
      }
    };

    emailRead();
  }, []);

  return (
    <>
      <Link to="/home">Back</Link>
      <section>
        <div>From: {emails[emailDetailKey].from}</div>
        <div>Subject: {emails[emailDetailKey].subject}</div>
        <div
          style={{
            textAlign: "center",
            marginTop: "4rem",
            color: "black",
            fontSize: "20px",
          }}
        >
          {emails[emailDetailKey].body}
        </div>
      </section>
    </>
  );
};

export default InboxDetails;
