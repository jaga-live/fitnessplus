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
    console.log(formData);
    setLoading(true);
    if (!signIn) {
      axiosInstance
        .post("/signup/user", formData)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setCookie("token", res.data.token);
          props.loginSuccess(res.data.token, res.data.logo);
          // props.history.push("/home");
          // window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          props.loginFailure();
          console.log(err);
          setMessage("Something went wrong !");
        });
    } else {
      axiosInstance
        .post("/login", formData)
        .then((res) => {
          setLoading(false);
          setCookie("token", res.data.token);
          // window.location.reload();
          // props.history.push("/home");
          props.loginSuccess(res.data.token, res.data.logo);
          console.log(res.data);
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
          console.log(err.response);
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
    <div className="full-page-wrapper flex-center auth flex-column">
      <h4>
        <span className="green">FITNESS</span> <span className="red">APP</span>
      </h4>
      <Mycard
        className="form bg-half-opacity box-shadow-none"
        title={signIn ? "SignIn" : "SignUp"}
      >
        <form onSubmit={submitHandler}>
          <FormInfo info={message} />
          <br />
          {!signIn ? (
            <Fragment>
              <Input
                className="bg-half-opacity"
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
            className="bg-half-opacity"
            name="email"
            value={formData.email}
            type="email"
            onChange={changeHandler}
            placeholder="Enter Email"
            required
          />
          <br />
          <Input
            className="bg-half-opacity"
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
            required
          />
          <br />
          <AsyncButton
            className="box-shadow-none bg-green margin-auto"
            disabled={!valid()}
            loading={loading}
            type="submit"
          >
            {" "}
            {signIn ? "SignIn" : "SignUp"}{" "}
          </AsyncButton>
          <br />
          <AsyncButton
            onClick={toggle}
            className="sm bg-transparent box-shadow-none margin-auto"
          >
            {" "}
            <p className="blue remove-para-margin">
              {signIn ? "Switch to SignUp" : "Switch to SignIn"}{" "}
            </p>{" "}
          </AsyncButton>
        </form>
      </Mycard>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (token, logo) => dispatch(loginSuccess(token, logo)),
    loginFailure: () => dispatch(loginFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
