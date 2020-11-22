import React, { useEffect, useState } from "react";
import AsyncButton from "../../UI/AsyncButton/AsyncButton";
import MyAutoSuggest from "../../UI/AutoSuggest/AutoSuggest";
import Modal from "../../UI/Modal/Modal";
import MyCard from "../../UI/MyCard/MyCard";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import { getImage } from "../Profile/getImage";
import "./Friends.css";
import Detail from "./DetailPage/Detail";
import { CSSTransition } from "react-transition-group";
import Requests from "./Requests/Requests";

const Friends = (props) => {
  const [data, setData] = useState([
    { name: "El Primo", avatar: 0 },
    { name: "Piper", avatar: 0 },
    { name: "Colt", avatar: 0 },
    { name: "Ninja", avatar: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState({ display: false, data: {} });
  const [showFriendRequests, setShowFriendRequests] = useState(
    props.location.state !== undefined
      ? props.location.state.showReceived
      : false
  );
  // my friends, view leaderboard

  console.log(
    props.location.state !== undefined
      ? props.location.state.showReceived
      : false
  );

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/myfriends")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setData([]);
      });
  }, []);

  const toggleFriendRequests = () => {
    setShowFriendRequests((prev) => !prev);
  };

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
    autoFocus: !showFriendRequests,
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
        show={showFriendRequests}
        onClick={toggleFriendRequests}
      >
        <CSSTransition
          in={showFriendRequests}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <Requests />
        </CSSTransition>
      </Modal>
      <Modal
        outerElementClassName="outer"
        innerElementClassName="inner"
        show={search}
        onClick={toggleSearch}
      >
        <CSSTransition
          in={search}
          timeout={300}
          classNames="alert"
          unmountOnExit
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
        </CSSTransition>
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
        <AsyncButton
          onClick={toggleFriendRequests}
          className="box-shadow-none sm bg-shade-green"
        >
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
        {data.length === 0 ? (
          <h4 className="white">No friends</h4>
        ) : (
          data.map((el, index) => (
            <div
              key={index}
              className="d-flex justify-content-between bg-grey vertical-flex-center each-friend bg-half-opacity"
            >
              <div className="fit-content flex-row vertical-flex-center">
                <div
                  className="small-logo margin-10"
                  style={{
                    backgroundImage:
                      "url('" +
                      getImage(el.avatar === null ? 0 : el.avatar) +
                      "')",
                  }}
                ></div>
                <h4>{el.name}</h4>
              </div>
              <h4 className="fit-content margin-10">. . .</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Friends;
