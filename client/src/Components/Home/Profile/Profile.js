import React, { useRef, useState } from "react";
import { Col } from "reactstrap";
import MyCard from "../../UI/MyCard/MyCard";
import { getImage } from "./getImage";

import "./Profile.css";

const Profile = (props) => {
  const [logo, setLogo] = useState(0);

  const [validity, setValidity] = useState(true);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const edit = useRef();

  const imageEdit = () => {};

  const imageChangeHandler = () => {};

  console.log(getImage(logo));

  return (
    <div>
      <MyCard className="flex-row wrap">
        <Col lg="6" md="6" sm="12" className="flex-column">
          <div className="profile">
            {logo === null || (!validity && touched) ? (
              <div
                style={{
                  backgroundImage: "url('" + getImage(logo) + "')",
                }}
                className={`profile-page-logo ${
                  sending ? "skeleton-loading" : ""
                }`}
              >
                <div onClick={sending ? () => {} : () => imageEdit()}>
                  <p>Edit</p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: "url('" + getImage(logo) + "')",
                }}
                className={`profile-page-logo ${
                  sending ? "skeleton-loading" : ""
                }`}
              >
                <div onClick={sending ? () => {} : () => imageEdit()}>
                  <p>Edit</p>
                </div>
              </div>
            )}
          </div>
        </Col>
      </MyCard>
    </div>
  );
};

export default Profile;
