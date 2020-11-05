import React, { useState } from "react";
import "./Auth.css";
import Mycard from "../UI/MyCard/MyCard";
import { Input } from "reactstrap";
import AsyncButton from "../UI/AsyncButton/AsyncButton";
import FormInfo from "../UI/FormInfo/FormInfo";
import { axiosInstance } from "../Utility/axiosInstance";
import { connect } from "react-redux";
import { loginFailure, loginSuccess } from "../Store/actions";

const Auth = (props) => {
  const [signIn, setSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(" ");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggle = () => {
    setSignIn((prev) => !prev);
  };

  const submitHandler = () => {
    console.log(formData);
    if (!signIn) {
      axiosInstance
        .post("/signup/user", formData)
        .then((res) => {
          console.log(res.data);
          props.history.push("/home");
          props.loginSuccess(res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance
        .post("/signin/user", formData)
        .then((res) => {
          props.history.push("/home");
          props.loginFailure();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const valid = () => {
    return Object.values(formData).every((el) => el.trim() !== "");
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
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    loginFailure: () => dispatch(loginFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
