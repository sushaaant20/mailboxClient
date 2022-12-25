import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import useHttp from "../../Hook/useHttp";
import { Badge, Card, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../../store/manage-email-reducer";

const Inbox = (prop) => {
  console.log(prop);
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
        url: `https://mailclient-25d59-default-rtdb.firebaseio.com/${prop.type}${userMail}/${prop.mails.id}.json`,
        data: dataObj,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };
  const bgColor = prop.mails.seen == false ? "red" : "skyblue";
  console.log(bgColor);

  return (
    <Fragment>
      <h6></h6>
      <Container
        style={{ display: "flex", justifyContent: "", padding: "10px" }}
      >
        <Card
          bg="secondary"
          style={{
            marginLeft: "10%",
            height: "60px",
            width: "600px",
            padding: "10px",
            color: "white",
          }}
        >
          <NavLink
            onClick={removeSeenHandler}
            style={{
              fontWeight: "bold",
              color: "white",
              backgroundColor: `${bgColor}`,
              height: "60px",
              padding: "10px",
            }}
            to={`/${prop.type}message/${prop.mails.id}`}
          >
            {prop.mails.message}
          </NavLink>
        </Card>
      </Container>
    </Fragment>
  );
};
export default Inbox;
