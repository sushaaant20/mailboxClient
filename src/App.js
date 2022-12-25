import { Fragment } from "react";
import "./App.css";
import Header from "./Components/Layout/Header";
import React, { useEffect } from "react";
import Auth from "./Components/Auth/Auth";
import Mailbox from "./Components/page/Mail/Mailbox";
import { Route, Switch } from "react-router-dom";
import MessageInbox from "./Components/page/MessageInbox/MessageInbox";
import { ActionForSentMail } from "./Components/store/store-actions";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreater } from "./Components/store/store-actions";
import SentBox from "./Components/page/SentBox/SentBox";

const App = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.MailBoxId);

  useEffect(() => {
    const rel = setInterval(() => {
      dispatch(ActionCreater(userEmail));
      dispatch(ActionForSentMail(userEmail));
    }, 1000);
    return () => clearInterval(rel);
  }, []);

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>

        <Route path="/mailbox/:id">
          <Mailbox />
        </Route>

        <Route path="/receivemessage/:id">
          <MessageInbox />
        </Route>

        <Route path="/sentmessage/:id">
          <SentBox />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
