import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Logout from "./Components/Auth/Logout/Logout";
import Home from "./Components/Home/Home";
import { getCookie } from "./Components/Utility/cookies";
import { connect } from "react-redux";
import {
  checkAuthStatus,
  loginFailure,
  loginSuccess,
} from "./Components/Store/actions";
import { axiosInstance } from "./Components/Utility/axiosInstance";
import Spinner from "./Components/UI/Spinner/Spinner";
import AdminHome from "./Components/Admin/Home/AdminHome";
import PageShell from "./Components/UI/PageShell/PageShell";

function App(props) {
  useEffect(() => {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${props.token}`;
    const checkAuthStatus = async () => {
      await props.checkAuthStatus(getCookie("token"));
    };
    checkAuthStatus();
  }, []);

  const getRoutes = () => {
    if (props.auth) {
      if (props.type === "admin") {
        return (
          <Switch>
            <Route path="/home" component={AdminHome} />
            <Route path="/logout" component={PageShell(Logout)} />
            <Redirect to="/home" />
          </Switch>
        );
      } else if (props.type !== "admin" || props.type === "user") {
        return (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/logout" component={PageShell(Logout)} />
            <Redirect
              // to="/home"
              to="/home"
            />
          </Switch>
        );
      }
    } else {
      return (
        <Switch>
          <Route path="/auth" component={PageShell(Auth)} />

          <Redirect to="/auth" />
        </Switch>
      );
    }
  };

  return props.loading ? (
    <div className="full-page-wrapper flex-center flex-column">
      <Spinner />
      {/* <h4>Logging out...</h4> */}
    </div>
  ) : (
    <div className="App full-page-wrapper hide-scroll-bar">{getRoutes()}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.login.token !== null && state.login.token !== undefined,
    token: state.login.token,
    loading: state.login.loading,
    type: state.login.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (token, logo, type) =>
      dispatch(loginSuccess(token, logo, type)),
    checkAuthStatus: (token) => dispatch(checkAuthStatus(token)),
    loginFailure: () => dispatch(loginFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
