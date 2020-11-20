import React from "react";
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
    { name: "Notifications", to: props.match.url + "/notification" },
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
  console.log(props.logo);
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
          // <img src={MainLogo} className="main-logo" />
          <h4 className="no-break">
            <span className="white">FITNESS</span>{" "}
            <span className="red h5">
              <i>PLUS</i>
            </span>
          </h4>
        }
        routes={routes}
      />
      <Route path={props.match.url + "/activity"} component={Activity} />
      <Route path={props.match.url + "/challanges"} component={Challanges} />
      <Route path={props.match.url + "/friends"} component={Friends} />
      <Route path={props.match.url + "/leaderboard"} component={LeaderBoard} />
      <Route
        path={props.match.url + "/notification"}
        component={Notifications}
      />
      <Route path={props.match.url + "/mobile"} component={Mobile} />
      <Route path={props.match.url + "/profile"} component={Profile} />
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
  };
};

export default connect(mapStateToProps)(Home);
