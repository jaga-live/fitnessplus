import React from "react";
import { Redirect, Route } from "react-router";
import "./AdminHome.css";
import { connect } from "react-redux";
import Add from "./Add/Add";
import View from "./View/View";
import Sidebar from "../../UI/Sidebar/Sidebar";

const AdminHome = (props) => {
  var routes = [
    { name: "Add Challenge", to: props.match.url + "/add" },
    { name: "View Challenge", to: props.match.url + "/view" },
    { name: "Logout", to: "/logout" },
  ];
  console.log(props.logo);
  return (
    <div className="home-bg full-page-wrapper-scroll">
      <Sidebar
        style={{ background: "transparent" }}
        heading={
          // <img src={MainLogo} className="main-logo" />
          <h4 className="no-break">
            <span className="white">FITNESS</span>{" "}
            <span className="red h5">
              <i>PLUS</i>
            </span>
            <span className="h4 green">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ADMIN
            </span>
          </h4>
        }
        routes={routes}
      />
      <Route path={props.match.url + "/add"} component={Add} />
      <Route path={props.match.url + "/view"} component={View} />
      <Redirect to={props.match.url + "/add"} />
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

export default connect(mapStateToProps)(AdminHome);
