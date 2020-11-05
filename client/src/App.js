import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Logout from "./Components/Auth/Logout/Logout";
import Home from "./Components/Home/Home";
import { getCookie } from "./Components/Utility/cookies";
import axios from "axios";

function App(props) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // axios.post('http://localhost:5000/auth')
    setUserId(getCookie("token"));
  }, []);
  console.log(userId);
  return (
    <div className="App full-page-wrapper hide-scroll-bar">
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
        <Redirect
          // to="/home"
          to={userId !== null && userId !== undefined ? "/auth" : "/home"}
        />
        {/* <Redirect to={userId ? "/home" : "/auth"} /> */}
      </Switch>
    </div>
  );
}

export default App;
