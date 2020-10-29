import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import { getCookie } from "./Components/Utility/cookies";

function App(props) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // axios.post('http://localhost:5000/auth')
    var token = getCookie("token");
    setUserId(token);
  }, []);

  return (
    <div className="App">
      <Route path="/auth" component={Auth} />
      <Route path="/home" component={Home} />
      <Redirect to={userId ? "/home" : "/auth"} />
      {/* <Redirect to={userId ? "/auth" : "/home"} /> */}
    </div>
  );
}

export default App;
