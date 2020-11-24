import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setNotification } from "../../Store/actions";
import Spinner from "../../UI/Spinner/Spinner";
import { axiosInstance } from "../../Utility/axiosInstance";
import EachNotification from "./EachNotification/EachNotification";
import "./Notifications.css";
import { withRouter } from "react-router-dom";

var x = 1;

const Notifications = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // notifications
  useEffect(() => {
    if (x === 1) {
      x = 0;
      setLoading(true);
      axiosInstance
        .post("/notifications", {
          date:
            new Date().getDate() +
            "-" +
            (parseInt(new Date().getMonth()) + 1) +
            "-" +
            new Date().getFullYear(),
        })
        .then((res) => {
          setData([...res.data]);
          setLoading(false);
          props.updateNotification(false, 0);
        })
        .catch((err) => {
          setData([]);
          setLoading(false);
        });
    }
    return (x = 1);
  }, []);

  useEffect(() => {
    if (window.location.href.endsWith("notification")) {
      props.updateNotification(false, 0);
    }
    if (props.notification) {
      axiosInstance
        .post("/notifications", {
          date:
            new Date().getDate() +
            "-" +
            (parseInt(new Date().getMonth()) + 1) +
            "-" +
            new Date().getFullYear(),
        })
        .then((res) => {
          setData([...res.data]);
          props.updateNotification(false, 0);
        })
        .catch((err) => {
          setData([]);
        });
    }
  }, [props.notification]);

  const goToRecieved = (data) => {
    props.history.push({
      pathname: "/home/friends",
      state: {
        showReceived: true,
      },
    });
  };

  return loading ? (
    <Spinner />
  ) : data.length === 0 ? (
    <div className="white h4">
      No <span className="h2 red">Notifications</span>
    </div>
  ) : (
    data.map((el, index) => (
      <EachNotification
        onClick={goToRecieved}
        data={el}
        key={index}
        index={index}
      />
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.login.notification,
  };
};

const mapdispatchToProps = (dispatch) => {
  return {
    updateNotification: (notification, count) =>
      dispatch(setNotification(notification, count)),
  };
};

export default connect(
  mapStateToProps,
  mapdispatchToProps
)(withRouter(Notifications));
