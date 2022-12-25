import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const SentBox = () => {
  const mails = useSelector((state) => state.mailmanager.sent);
  const { id } = useParams();

  let arr = mails.find((index) => index.id === id);

  return (
    <React.Fragment>
      <h4 style={{ marginLeft: "34%" }}>SENT EMAIL</h4>
      <Card
        bg="light"
        style={{
          marginTop: "3%",
          width: "399px",
          marginLeft: "35%",
          color: "black",
          padding: "20px",
        }}
      >
        <h5>{arr ? arr.subject : "loading.."}</h5>
        <p>{arr ? arr.message : "loading.."}</p>
      </Card>
    </React.Fragment>
  );
};
export default SentBox;
