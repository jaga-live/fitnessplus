import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Logout from "./Components/Auth/Logout/Logout";
import Home from "./Components/Home/Home";
import { getCookie } from "./Components/Utility/cookies";
import { connect } from "react-redux";
import { loginFailure, loginSuccess } from "./Components/Store/actions";
import { axiosInstance } from "./Components/Utility/axiosInstance";

function App(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // axios.post('http://localhost:5000/auth')
    setLoading(true);
    if (getCookie("token") !== null && getCookie("token") !== undefined) {
      props.loginSuccess(getCookie("token"));
      setLoading(false);
    } else {
      setLoading(false);
      props.loginFailure();
    }
  }, []);

  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] = props.token;
  }, [props.token]);

  const getRoutes = () => {
    if (props.auth) {
      return (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/logout" component={Logout} />
          <Redirect
            // to="/home"
            to="/home"
          />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/auth" component={Auth} />

          <Redirect to="/auth" />
        </Switch>
      );
    }
  };

  console.log(props.auth);
  return (
    <div className="App full-page-wrapper hide-scroll-bar">{getRoutes()}</div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.login.token !== null && state.login.token !== undefined,
    token: state.login.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    loginFailure: () => dispatch(loginFailure()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
