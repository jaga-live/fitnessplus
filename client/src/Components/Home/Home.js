import React, { useEffect, useMemo } from "react";
import { Redirect, Route } from "react-router";
import Profile from "./Profile/Profile";
import MyCard from "../UI/MyCard/MyCard";
import Sidebar from "../UI/Sidebar/Sidebar";
import Activity from "./Activity/Activity";
import Friends from "./Friends/Friends";
import "./Home.css";
import Notifications from "./Notifications/Notifications";
import LeaderBoard from "./Leaderboard/Leaderboard";
import { getImage } from "./Profile/getImage";
import Challanges from "./Challanges/Challanges";
import { connect } from "react-redux";
import Mobile from "./Mobile/Mobile";
import PageShell from "../UI/PageShell/PageShell";
import MainLogo from "../../assets/main-logo.png";
import { axiosInstance } from "../Utility/axiosInstance";
import { setNotification } from "../Store/actions";
import MakeSound from "../../assets/notify.mpeg";
import { Howl } from "howler";
import { updateTitle } from "../Utility/getTitle";

var x = 1;

const Home = (props) => {
  var routes = [
    {
      name: "Activity",
      to: props.match.url + "/activity",
      initialActive: true,
    },
    { name: "Challenges", to: props.match.url + "/challanges" },
    { name: "Friends", to: props.match.url + "/friends" },
    { name: "Leaderboard", to: props.match.url + "/leaderboard" },
    {
      name: (
        <p className="remove-para-margin" style={{ position: "relative" }}>
          NOTIFICATIONS{" "}
          {props.notificationCount === 0 ? null : (
            <div className="notification-label">{props.notificationCount}</div>
          )}
        </p>
      ),
      to: props.match.url + "/notification",
    },
    {
      name: (
        <p style={{ marginBottom: 0 }}>
          Mobile <sup className="red h6">beta</sup>
        </p>
      ),
      to: props.match.url + "/mobile",
    },
    { name: "Logout", to: "/logout" },
    {
      component: (
        <div
          style={{
            backgroundImage: "url(" + getImage(parseInt(props.logo)) + ")",
          }}
          className="nav-logo"
        ></div>
      ),
      to: props.match.url + "/profile",
    },
  ];

  const Notify = () => {
    var makeSound = new Howl({
      src: MakeSound,
    });
    makeSound.play();
  };

  useEffect(() => {
    var timer,
      m = 1;
    console.log("did mount home");
    const checkNotification = () => {
      if (m === 1) {
        axiosInstance
          .post("/notify")
          .then((res) => {
            m = 1;
            if (parseInt(res.data.status) > 0) {
              updateTitle(res.data.status);
              props.updateNotification(true, res.data.status);
              Notify();
              clearTimeout(timer);
              timer = setTimeout(() => {
                checkNotification();
                m = 0;
              }, 5000);
            } else {
              timer = setTimeout(() => {
                checkNotification();
                m = 0;
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
            // audio.play();
            updateTitle(0);
            clearTimeout(timer);
            timer = setTimeout(() => {
              checkNotification();
              m = 0;
            }, 3000);
          });
      }
    };

    if (x === 1) {
      checkNotification();
    }
    return (x = 0);
  }, [props.notification]);

  useEffect(() => {
    updateTitle();
  }, [window.location.href]);

  return (
    <div className="home-bg full-page-wrapper-scroll">
      <Sidebar
        style={{ background: "transparent" }}
        showOnMobile={
          <div
            className="nav-logo-mobile"
            onClick={() => props.history.push(props.match.url + "/profile")}
            style={{
              backgroundImage: "url(" + getImage(parseInt(props.logo)) + ")",
            }}
          ></div>
        }
        heading={
          <img src={MainLogo} className="main-logo-nav" />
          // <h4 className="no-break">
          //   <span className="white">FITNESS</span>{" "}
          //   <span className="red h5">
          //     <i>PLUS</i>
          //   </span>
          // </h4>
        }
        routes={routes}
      />
      <Route
        path={props.match.url + "/activity"}
        component={PageShell(Activity)}
      />
      <Route
        path={props.match.url + "/challanges"}
        component={PageShell(Challanges)}
      />
      <Route
        path={props.match.url + "/friends"}
        component={PageShell(Friends)}
      />
      <Route
        path={props.match.url + "/leaderboard"}
        component={PageShell(LeaderBoard)}
      />
      <Route
        path={props.match.url + "/notification"}
        component={PageShell(Notifications)}
      />
      <Route path={props.match.url + "/mobile"} component={PageShell(Mobile)} />
      <Route
        path={props.match.url + "/profile"}
        component={PageShell(Profile)}
      />
      <Redirect to={props.match.url + "/activity"} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logo:
      state.login.logo === null || state.login.logo === undefined
        ? 0
        : parseInt(state.login.logo),
    notification: state.login.notification,
    notificationCount: state.login.notificationCount,
  };
};

const mapdispatchToProps = (dispatch) => {
  return {
    updateNotification: (notification, count) =>
      dispatch(setNotification(notification, count)),
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(Home);
