import React, { useState, useRef, useContext, Fragment } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const AuthForm = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //login and signUp toggle
  const [isLogin, setIsLogin] = useState(false);
  const [isSendingReq, setIsSendingReq] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //Switch between login and signup
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //signUp
    if (!isLogin) {
      //get email and password
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      //check if the fields are not empty
      if (email === "" || password === "" || confirmPassword === "") {
        alert("Enter all fields");
      } else if (confirmPassword !== password) {
        alert("Passwords dont match");
      }
      // check if password and email matches and signup the user
      else {
        try {
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_VERY_PRIVATE_KEY}`,
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              header: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.ok) {
            setIsSendingReq(false);
            alert("Signed Up Success");
            // localStorage.setItem("email", emailRef);
          } else {
            const data = await res.json();
            console.log(data.error.message);
            alert(data.error.message);
            setIsSendingReq(false);
          }
        } catch (err) {
          console.log(err);
          setIsSendingReq(false);
        }
      }
    } else {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_VERY_PRIVATE_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
            header: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          //if credential matches
          setIsSendingReq(false);
          alert("User authenticated successfully");

          navigate("/home", { replace: true });

          const data = await res.json();
          console.log(data);

          // localStorage.setItem("expense_token", data.idToken);
          console.log(data.email);
          const token = data.idToken;
          const loginEmail = data.email;
          console.log(String(loginEmail));
          dispatch(authActions.login(token));
          dispatch(authActions.setUserMail(loginEmail));

          // userCtx.updateToken(data.idToken);
          // history.replace('/');
        } else {
          //if credentials are wrong
          const data = await res.json();
          // console.log(data.error.message);
          // alert('Weak password : password should be at least 6 characters');
          alert(data.error.message);
          setIsSendingReq(false);
        }
      } catch (error) {
        //do something
        console.log(error.message);
        setIsSendingReq(false);
      }
    }
  };

  return (
    <Container>
      <Container>
        <Card
          bg=""
          style={{
            display: "flex",
            marginTop: "120px",
            marginLeft: "35%",
            height: "350px",
            width: "400px",
            padding: "30px",
          }}
        >
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "",
              marginBottom: "20px",
            }}
          >
            {isLogin ? "Login" : "SignUp"}
          </h4>
          <Form style={{}} onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </Form.Group>

            {!isLogin && (
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                />
              </Form.Group>
            )}

            {!isSendingReq && (
              <Button
                variant="primary"
                type="submit"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            )}
            {isSendingReq && <p>Sending Request</p>}
          </Form>
          {isLogin && <Link to="..">Forgot password</Link>}
          <Button
            variant="danger"
            onClick={switchAuthModeHandler}
            style={{ marginTop: "5px" }}
          >
            {isLogin
              ? "Don't have an account?Sign Up"
              : "Have an account?Login"}
          </Button>
        </Card>
      </Container>
    </Container>
  );
};

export default AuthForm;
