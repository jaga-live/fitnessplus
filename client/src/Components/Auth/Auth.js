import React, { useState } from "react";
import "./Auth.css";
import Mycard from "../UI/MyCard/MyCard";
import { Input } from "reactstrap";
import AsyncButton from "../UI/AsyncButton/AsyncButton";
import FormInfo from "../UI/FormInfo/FormInfo";

const Auth = (props) => {
  const [signIn, setSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(" ");
  const [formData, setFormData] = useState({
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
  };
  const valid = () => {
    return Object.values(formData).every((el) => el.trim() !== "");
  };

  return (
    <div className="full-page-wrapper flex-center">
      <Mycard className="form" title={signIn ? "SignIn" : "SignUp"}>
        <form onSubmit={submitHandler}>
          <FormInfo info={message} />
          <Input
            name="email"
            value={formData.email}
            type="email"
            onChange={changeHandler}
            placeholder="Enter Email"
            required
          />
          <br />
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
            required
          />
          <br />
          <AsyncButton disabled={!valid()} loading={loading}>
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

export default Auth;
