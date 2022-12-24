import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../../store/inboxSlice";
import InboxDetails from "./InboxDetails";
import axios from "axios";
import { Card } from "react-bootstrap";

const Inbox = () => {
  const navigate = useNavigate();
  const [emailDetail, setEmailDetail] = useState(false);

  const loginEmail = useSelector((state) => state.auth.loginEmail);

  const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");

  const emails = useSelector((state) => state.inbox.emails);

  const dispatch = useDispatch();

  const getEmails = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedLoggedInEmail}/Inbox.json`
      );
      console.log(response.data);
      dispatch(inboxActions.onEmailFetch(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, formattedLoggedInEmail]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  const onSingleEmailClickHandler = (email) => {
    setEmailDetail(email);
  };
  const deleteEmailHandler = async (email) => {
    console.log(email);
    alert("Are you sure you want to delete");

    try {
      const res = await axios.delete(
        `https://expense-tracker-909bf-default-rtdb.asia-southeast1.firebasedatabase.app/${formattedLoggedInEmail}/Inbox/${email}.json`
      );

      console.log(res);
      getEmails();
      alert("E-mail successfully deleted");
      // history.replace("/mail-page");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Card style={{ height: "400px", width: "600px", marginLeft: "30%" }}>
        <h2>Inbox</h2>
        <hr />
        <ul>
          {!emailDetail &&
            emails !== null &&
            Object.keys(emails).map((email) => {
              let read = false;
              if (emails[email].read !== false) {
                read = true;
              }
              return (
                <div onClick={() => onSingleEmailClickHandler(email)}>
                  <li
                    key={email.id}
                    style={{ listStyleType: read ? "none" : "disc" }}
                  >
                    <span>
                      <span
                        style={{
                          marginRight: "1rem",
                          color: "purple",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        {" "}
                        {emails[email].from}
                      </span>
                      <span
                        style={{
                          marginRight: "1rem",
                          color: "#rgb(57, 53, 53)",
                          fontWeight: "normal",
                        }}
                      >
                        {emails[email].subject}
                      </span>
                      <span style={{ color: "#777", fontWeight: "normal" }}>
                        {emails[email].body}
                      </span>
                    </span>
                    <button onClick={() => deleteEmailHandler(email)}>X</button>
                  </li>
                  <hr />
                </div>
              );
            })}
          {emailDetail && (
            <InboxDetails emailDetails={{ emailDetail, emails }} />
          )}
          {emails === null && <p>No emails found</p>}
        </ul>
      </Card>
    </>
  );
};

export default Inbox;
