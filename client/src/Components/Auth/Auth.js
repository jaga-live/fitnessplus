import React, { Fragment, useState } from "react";
import "./Auth.css";
import Mycard from "../UI/MyCard/MyCard";
import { Input } from "reactstrap";
import AsyncButton from "../UI/AsyncButton/AsyncButton";
import FormInfo from "../UI/FormInfo/FormInfo";
import { axiosInstance } from "../Utility/axiosInstance";
import { connect } from "react-redux";
import { loginFailure, loginSuccess } from "../Store/actions";
import { setCookie } from "../Utility/cookies";
import MainLogo from "../../assets/main-logo.png";

const Auth = (props) => {
  const [signIn, setSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(" ");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setMessage(" ");
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggle = () => {
    setSignIn((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setMessage(" ");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!signIn) {
      axiosInstance
        .post("/signup/user", formData)
        .then((res) => {
          setLoading(false);
          setCookie("token", res.data.token, { expires: new Date(3030, 1, 1) });
          props.loginSuccess(res.data.token, res.data.avatar, res.type);
          // props.history.push("/home");
          // window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          props.loginFailure();
          if (err.response !== undefined) {
            if (err.response.status === 409) {
              setMessage("Email already Exists !");
            } else setMessage("Something went wrong !");
          } else setMessage("Something went wrong !");
        });
    } else {
      axiosInstance
        .post("/login", formData)
        .then((res) => {
          setLoading(false);
          setCookie("token", res.data.token, { expires: new Date(3030, 1, 1) });
          // window.location.reload();
          // props.history.push("/home");
          props.loginSuccess(res.data.token, res.data.avatar, res.data.type);
        })
        .catch((err) => {
          setLoading(false);
          props.loginFailure();
          if (err.response !== null && err.response !== undefined) {
            if (err.response.status === 403) {
              setMessage("Invalid Email or Password !");
            } else {
              setMessage("Something went wrong !");
            }
          }
        });
    }
  };
  const valid = () => {
    let requiredFields;
    if (!signIn)
      requiredFields = [formData.name, formData.email, formData.password];
    else requiredFields = [formData.email, formData.password];
    return requiredFields.every((el) => el.trim() !== "");
  };

  return (
    <Fragment>
      <div
        className="full-page-wrapper flex-center auth flex-column"
        style={{ zIndex: 1 }}
      >
        <div className="fake-bg"></div>
        <img src={MainLogo} className="main-logo-auth" style={{ zIndex: 1 }} />
        {/* <h4> */}
        {/* <span className="green">FITNESS</span> <span className="red">APP</span> */}
        {/* <h4 className="no-break">
        <span className="white">FITNESS</span>{" "}
        <span className="red h5">
          <i>
            PLUS
            <br />
            <br />
          </i>
        </span>
      </h4> */}
        {/* </h4> */}
        <Mycard
          className="form white bg-half-opacity box-shadow-none"
          // title={signIn ? "SignIn" : "SignUp"}
          titleCenter
        >
          <form onSubmit={submitHandler} autoComplete="off">
            <FormInfo info={message} />
            <br />
            {!signIn ? (
              <Fragment>
                <Input
                  autoFocus
                  autoComplete="off"
                  className="my-form-input bg-half-opacity white"
                  name="name"
                  value={formData.name}
                  type="text"
                  onChange={changeHandler}
                  placeholder="Enter Name"
                  required
                />
                <br />
              </Fragment>
            ) : null}
            <Input
              className="white my-form-input bg-half-opacity"
              autoComplete="off"
              name="email"
              autoFocus
              value={formData.email}
              type={signIn ? "text" : "email"}
              onChange={changeHandler}
              placeholder="Enter Email"
              required
            />
            <br />
            <Input
              className="white my-form-input bg-half-opacity"
              name="password"
              autoComplete="off"
              type="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              required
            />
            <br />
            <br />
            <div className="auth-buttons-container">
              <AsyncButton
                className="box-shadow-none bg-green"
                disabled={!valid()}
                loading={loading}
                type="submit"
              >
                {" "}
                {signIn ? "Sign in" : "Sign up"}{" "}
              </AsyncButton>
              <br />
              <AsyncButton
                onClick={toggle}
                className="sm bg-transparent box-shadow-none"
              >
                {" "}
                <p style={{ color: "tomato" }} className="remove-para-margin">
                  {signIn
                    ? "Don't have an account ?"
                    : "Already have an account ?"}{" "}
                </p>{" "}
              </AsyncButton>
            </div>
          </form>
        </Mycard>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (token, logo, type) =>
      dispatch(loginSuccess(token, logo, type)),
    loginFailure: () => dispatch(loginFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
