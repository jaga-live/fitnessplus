import React, { useState } from "react";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import MyAutoSuggest from "../../UI/AutoSuggest/AutoSuggest";
import Modal from "../../UI/Modal/Modal";
import MyCard from "../../UI/MyCard/MyCard";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import { getImage } from "../Profile/getImage";
import "./Friends.css";
import Detail from "./DetailPage/Detail";

const Friends = (props) => {
  const [data, setData] = useState([
    { name: "El Primo", logo: 0, count: "89" },
    { name: "Piper", logo: 1, count: "70" },
    { name: "Colt", logo: 2, count: "759" },
    { name: "Ninja", logo: 3, count: "2398" },
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState({ display: false, data: {} });
  const [briefLoading, setBriefLoading] = useState(false);

  const onInputChangeAsync = (value, callback) => {
    console.log("hello");
    axiosInstance
      .post("/searchpeople", { text: value })
      .then((res) => {
        console.log(res.data);
        setOptions([...res.data]);
        callback();
      })
      .catch((err) => {
        setOptions([]);
        callback();
        console.log(err);
      });
  };

  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const searchboxProps = {
    className: "search-bar-input",
    placeholder: "Search Friends",
    autoFocus: true,
  };

  const onClick = (suggestion) => {
    setShow({ display: true, data: { ...suggestion } });
  };

  const Close = () => {
    setShow({ display: false, data: {} });
  };

  return loading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <Modal
        outerElementClassName="outer"
        innerElementClassName="inner"
        show={search}
        onClick={toggleSearch}
      >
        <MyAutoSuggest
          onInputChangeAsync={onInputChangeAsync}
          options={[...options]}
          inputProps={searchboxProps}
          eachSuggestion={(suggestion) => (
            <div
              className="each-suggestion"
              onClick={() => onClick(suggestion)}
            >
              {<img src={getImage(0)} className="suggestion-image" />}{" "}
              {suggestion.name}
            </div>
          )}
        />
      </Modal>
      <Modal
        outerElementClassName="outer"
        innerElementClassName="inner"
        show={show.display}
        onClick={Close}
      >
        <MyCard className="brief-card">
          <Detail data={show.data} />
        </MyCard>
      </Modal>
      <div className="d-flex justify-content-between each-friend vertical-flex-center">
        <AsyncButton className="box-shadow-none sm bg-shade-green">
          <p className="remove-para-margin white"> Friend Requests</p>
        </AsyncButton>
        <h4 className="white">
          My <span className="h2 red">Friends</span>
        </h4>
        <AsyncButton
          onClick={toggleSearch}
          className="box-shadow-none sm bg-shade-green"
        >
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
