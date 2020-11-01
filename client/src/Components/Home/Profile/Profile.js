import React, { Fragment, useRef, useState } from "react";
import { Col } from "reactstrap";
import MyCard from "../../UI/MyCard/MyCard";
import Spinner from "../../UI/Spinner/Spinner";
import { getImage } from "./getImage";

import "./Profile.css";

const Profile = (props) => {
  const [logo, setLogo] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [validity, setValidity] = useState(true);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const edit = useRef();

  const imageEdit = () => {
    setShow(true);
  };

  const imageChangeHandler = (id) => {
    setLogo(id);
    setShow(false);
    setSending(true);
    setTimeout(() => {
      setSending(false);
    }, 5000);
  };

  console.log(getImage(logo));

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div className="flex-center flex-column">
      <div className="profile bg-white">
        <div
          style={{
            backgroundImage: "url('" + getImage(logo) + "')",
          }}
          className={`profile-page-logo ${sending ? "skeleton-loading" : ""}`}
        >
          <div onClick={sending ? () => {} : () => imageEdit()}>
            <p className="white">Edit</p>
          </div>
        </div>
      </div>
      <br />
      {show ? (
        <Fragment>
          <h4 className="white">Choose Avatar</h4>
          <br />
          <MyCard
            className="bg-transparent box-shadow-none"
            style={{ maxWidth: "95%", margin: "auto" }}
          >
            <div className="flex-row flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((el, index) => (
                <div
                  key={index}
                  onClick={() => imageChangeHandler(el)}
                  className="profile bg-white"
                  style={{ margin: "10px auto", cursor: "pointer" }}
                >
                  <div
                    style={{
                      backgroundImage: "url('" + getImage(el) + "')",
                    }}
                    className={`profile-page-logo`}
                  ></div>
                </div>
              ))}
            </div>
            <br />
            <button
              className="bg-red sm margin-auto"
              onClick={() => setShow(false)}
            >
              <p className="white remove-para-margin">Cancel</p>
            </button>
          </MyCard>
        </Fragment>
      ) : null}
    </div>
  );
};

export default Profile;
