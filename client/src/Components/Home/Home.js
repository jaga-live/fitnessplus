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
import heading from "../../avatar/Barley.png";

const Home = (props) => {
  var routes = [
    {
      name: "Activity",
      to: props.match.url + "/activity",
      initialActive: true,
    },
    { name: "Friends", to: props.match.url + "/friends" },
    { name: "Leaderboard", to: props.match.url + "/leaderboard" },
    { name: "Notifications", to: props.match.url + "/notification" },
    { name: "Profile", to: props.match.url + "/profile" },
    { name: "Logout", to: "/logout" },
  ];
  return (
    <div>
      <Sidebar
        style={{ background: "transparent" }}
        heading={
          <img
            src={heading}
            alt="logo"
            // className=""
          />
        }
        routes={routes}
      />
      <Route path={props.match.url + "/activity"} component={Activity} />
      <Route path={props.match.url + "/friends"} component={Friends} />
      <Route path={props.match.url + "/leaderboard"} component={LeaderBoard} />
      <Route
        path={props.match.url + "/notification"}
        component={Notifications}
      />
      <Route path={props.match.url + "/profile"} component={Profile} />
      <Redirect to={props.match.url + "/activity"} />
    </div>
  );
};

export default Home;
