import React, { useState, useRef } from "react";
import useHttp from "../Hook/useHttp";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth-reducer";
import { Card, Container, Button, Form } from "react-bootstrap";

const Auth = () => {
  const [isLogin, setLogin] = useState(true);
  const [error, sendRequest] = useHttp();
  const enteredEmailRef = useRef();
  const enteredPassRef = useRef();
  const enteredConfPassRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredMail = enteredEmailRef.current.value;
    const enteredPass = enteredPassRef.current.value;
    const enteredConfPass = !isLogin ? enteredConfPassRef.current.value : null;

    console.log("form submit");

    const authObj = {
      email: enteredMail,
      password: enteredPass,
      returnSecureToken: true,
    };
    if (isLogin) {
      if (enteredMail.trim().length === 0 || enteredPass.trim().length === 0) {
        alert("Please enter all inputs");
      } else {
        const resData = (res) => {
          console.log(res.data);
          dispatch(authAction.setToken(res.data.idToken));
          let mail1 = enteredMail.replace("@", "");
          let mail2 = mail1.replace(".", "");
          dispatch(authAction.setEmailId(mail2));
          history.replace("/mailbox/welcome");
        };

        sendRequest(
          {
            request: "post",
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjXn3ZuxwRU-mb7uz8vrpXFkfFPQfxZWY",
            data: authObj,
            header: { "Content-Type": " application/json" },
          },
          resData
        );
      }
    } else {
      console.log(authObj);

      if (
        enteredMail.trim().length === 0 ||
        enteredPass.trim().length === 0 ||
        enteredConfPass.trim().length === 0
      ) {
        alert("Please enter all inputs");
      } else if (enteredPass !== enteredConfPass) {
        alert("Password mismatch");
      } else {
        const resData = () => {
          enteredEmailRef.current.value = "";
          enteredPassRef.current.value = "";
          enteredConfPassRef.current.value = "";
          alert("Your Account Created Successfully !!");
          setLogin(false);
        };

        sendRequest(
          {
            request: "post",
            url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjXn3ZuxwRU-mb7uz8vrpXFkfFPQfxZWY",
            data: authObj,
            header: { "Content-Type": " application/json" },
          },
          resData
        );
      }
    }
  };

  const toggleButtonHandler = (event) => {
    event.preventDefault();
    setLogin(!isLogin);
  };

  return (
    <Card
      style={{
        height: "60vh",
        marginLeft: "500px",
        width: "400px",
        padding: "10px",
      }}
    >
      {error && <h2>{`${error}  :(`}</h2>}
      <Form style={{ padding: "20px" }}>
        <Form.Group style={{ padding: "20px" }}>
          <h3>{isLogin ? "Login" : "Sign Up"}</h3>
          <Form.Control
            ref={enteredEmailRef}
            type="email"
            autoComplete="on"
            placeholder="Email"
          />

          <br />
          <Form.Control
            ref={enteredPassRef}
            type="password"
            autoComplete="on"
            placeholder="Password"
          />
          <br />
          {!isLogin && (
            <Form.Control
              ref={enteredConfPassRef}
              type="password"
              autoComplete="on"
              placeholder="Confirm Password"
            />
          )}
          <br />
          <Button onClick={formSubmitHandler}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <br />
          <br />
          <Button
            variant="danger"
            onClick={toggleButtonHandler}
            style={{ marginLeft: "60px" }}
          >
            {isLogin ? "Click here for Sign Up" : "Already Registered ?"}
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};
export default Auth;
