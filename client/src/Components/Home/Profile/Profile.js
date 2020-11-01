import React, { Fragment, useRef, useState } from "react";
import { Col } from "reactstrap";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import MyCard from "../../UI/MyCard/MyCard";
import Spinner from "../../UI/Spinner/Spinner";
import { getImage } from "./getImage";

import "./Profile.css";

const Profile = (props) => {
  const [logo, setLogo] = useState({ tag: 0, name: "Rishi" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [names, setNames] = useState([
    { tag: 0, name: "Rishi" },
    { tag: 1, name: "Velan" },
    { tag: 2, name: "Mani" },
    { tag: 3, name: "Mani 2" },
    { tag: 4, name: "Mani 3" },
    { tag: 5, name: "Mani 4" },
  ]);

  const [validity, setValidity] = useState(true);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const edit = useRef();

  const imageEdit = () => {
    setShow(true);
  };

  const imageChangeHandler = (event, id) => {
    event.preventDefault();
    setEditProfile(true);
    setLogo(id);
    setShow(false);
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setEditProfile(false);
    }, 5000);
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    let clone = logo;
    let cloneArray = names;
    cloneArray = cloneArray.map((el) => {
      if (el.tag === clone.tag) {
        el.name = value;
      }
      return el;
    });
    clone.name = value;
    setLogo({ ...clone });
    setNames([...cloneArray]);
  };

  console.log(editProfile);

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div className="flex-center flex-column">
      <form
        onSubmit={(event) => imageChangeHandler(event, logo)}
        className="flex-center flex-column"
      >
        <div className="profile bg-white">
          <div
            style={{
              backgroundImage: "url('" + getImage(logo.tag) + "')",
            }}
            className={`profile-page-logo ${sending ? "skeleton-loading" : ""}`}
          >
            <div onClick={sending ? () => {} : () => imageEdit()}>
              <p className="white">Edit</p>
            </div>
          </div>
        </div>
        <input
          required
          onChange={changeHandler}
          disabled={sending || !editProfile}
          name="name"
          value={logo.name}
          className={`profile-name margin-auto bg-black-half-opacity edit-textbox white ${
            sending ? "skeleton-loading" : ""
          }`}
        />
        <div>
          <br />
          <div>
            {/* {editProfile ? ( */}
            <AsyncButton
              type="submit"
              disabled={sending}
              loading={submitLoading}
              className={`box-shadow-none sm bg-green ${
                !editProfile ? "hide" : ""
              }`}
            >
              Update
            </AsyncButton>
            {/* ) : ( */}
            <AsyncButton
              type="button"
              onClick={() => setEditProfile(true)}
              className={`box-shadow-none sm bg-green ${
                editProfile ? "hide" : ""
              }`}
            >
              Edit
            </AsyncButton>
            {/* )} */}
          </div>
        </div>
      </form>
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
              {names.map((el, index) => (
                <div className="flex-column">
                  <div
                    key={index}
                    onClick={(event) => imageChangeHandler(event, el)}
                    className="profile bg-white"
                    style={{ margin: "10px 5px", cursor: "pointer" }}
                  >
                    <div
                      style={{
                        backgroundImage: "url('" + getImage(el.tag) + "')",
                      }}
                      className={`profile-page-logo`}
                    ></div>
                  </div>
                  <h4 className="white margin-auto"> {el.name} </h4>
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
