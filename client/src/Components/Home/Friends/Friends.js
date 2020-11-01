import React, { useState } from "react";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import Spinner from "../../UI/Spinner/Spinner";
import { getImage } from "../Profile/getImage";
import "./Friends.css";

const Friends = (props) => {
  const [data, setData] = useState([
    { name: "El Primo", logo: 0, count: "89" },
    { name: "Piper", logo: 1, count: "70" },
    { name: "Colt", logo: 2, count: "759" },
    { name: "Ninja", logo: 3, count: "2398" },
  ]);
  const [loading, setLoading] = useState(false);

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <div className="d-flex justify-content-between each-friend  vertical-flex-center">
        <AsyncButton className="box-shadow-none sm bg-shade-green">
          <p className="remove-para-margin white"> Friend Requests</p>
        </AsyncButton>
        <h4 className="white">
          My <span className="h2 red">Friends</span>
        </h4>
        <AsyncButton className="box-shadow-none sm bg-shade-green">
          <p className="remove-para-margin white">+ Add New Friend</p>
        </AsyncButton>
      </div>
      <br />
      <div className="flex-column">
        {data.map((el, index) => (
          <div
            key={index}
            className="d-flex justify-content-between bg-grey vertical-flex-center each-friend bg-half-opacity"
          >
            <div className="fit-content flex-row vertical-flex-center">
              <div
                className="small-logo margin-10"
                style={{ backgroundImage: "url('" + getImage(el.logo) + "')" }}
              ></div>
              <h4>{el.name}</h4>
            </div>
            <h4 className="fit-content margin-10">{el.count}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
